from flask import Blueprint, request, jsonify, send_from_directory
import sqlite3
import os
from download_manager import DownloadManager
from models import Song

api = Blueprint('api', __name__)
download_manager = DownloadManager()

def get_db():
    db_path = os.path.join(os.path.dirname(__file__), 'songs.sqlite')
    return sqlite3.connect(db_path)

@api.route('/download/<string:id>', methods=['POST'])
def download_song_by_id(id):
    try:
        conn = get_db()
        cursor = conn.cursor()

        # Check if song is already downloaded
        cursor.execute('SELECT * FROM downloads WHERE id = ?', (id,))
        existing = cursor.fetchone()
        if existing:
            return jsonify({'message': 'Song already downloaded'}), 409

        # Get song details from songs table
        cursor.execute('SELECT * FROM songs WHERE id = ?', (id,))
        song = cursor.fetchone()
        if song is None:
            return jsonify({'error': 'Song not found'}), 404

        song = dict(zip([col[0] for col in cursor.description], song))

        # Download music file
        filename = f"{song['title']}.mp3"
        local_path = download_manager.download_file(song['source'], filename)
        
        if not local_path:
            return jsonify({'error': 'Download failed'}), 500

        # Download image if URL provided
        image_path = None
        if song['image'] != '':  # Ensure image URL is not empty
            image_filename = f"{song['title']}_cover.jpg"
            image_path = download_manager.download_file(song['image'], image_filename)

        # Insert downloaded song into downloads table
        cursor.execute('''
            INSERT INTO downloads 
            (id, title, album, artist, source, local_path, image, favorite, counter, replay)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            song['id'],
            song['title'],
            song['album'],
            song['artist'],
            song['source'],
            local_path,
            image_path or song['image'],
            song['favorite'],
            song['counter'],
            song['replay']
        ))
        
        conn.commit()
        
        cursor.execute('SELECT * FROM downloads WHERE id = ?', (id,))
        downloaded_song = dict(zip([col[0] for col in cursor.description], cursor.fetchone()))
        
        conn.close()
        return jsonify(downloaded_song), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@api.route('/download/<string:id>', methods=['GET'])
def check_downloaded_song(id):
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        # Ensure downloads table exists
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS downloads (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                album TEXT,
                artist TEXT,
                source TEXT NOT NULL,
                local_path TEXT NOT NULL,
                image TEXT,
                duration INTEGER,
                favorite TEXT DEFAULT '0',
                counter INTEGER DEFAULT 0,
                replay INTEGER DEFAULT 0
            )
        ''')
        conn.commit()
        
        cursor.execute('SELECT * FROM downloads WHERE id = ?', (id,))
        song = cursor.fetchone()
        
        if song:
            return jsonify(dict(zip([col[0] for col in cursor.description], song)))
        return jsonify({'message': 'Song not downloaded'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@api.route('/downloads', methods=['GET'])
def get_downloaded_songs():
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM downloads')
        songs = cursor.fetchall()
        return jsonify([dict(zip([col[0] for col in cursor.description], song)) for song in songs])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@api.route('/files/<path:filename>', methods=['GET'])
def serve_file(filename):
    return send_from_directory(download_manager.download_dir, filename)

@api.route('/songs', methods=['GET'])
def get_songs():
    songs = Song.get_all_songs()
    return jsonify(songs)

@api.route('/song/<string:id>', methods=['GET'])
def get_song(id):
    song = Song.get_song_by_id(id)
    if song is None:
        return jsonify({'error': 'Song not found'}), 404
    return jsonify(song)

@api.route('/song/<string:id>/favorite', methods=['POST'])
def toggle_favorite(id):
    song = Song.toggle_favorite(id)
    if song is None:
        return jsonify({'error': 'Song not found'}), 404
    return jsonify(song)
