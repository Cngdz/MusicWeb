import sqlite3
import os

def get_db_connection():
    db_path = os.path.join(os.path.dirname(__file__), 'songs.sqlite')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

class Song:
    @staticmethod
    def get_all_songs():
        conn = get_db_connection()
        songs = conn.execute('SELECT * FROM songs').fetchall()
        conn.close()
        return [dict(song) for song in songs]

    @staticmethod
    def get_song_by_id(song_id):
        conn = get_db_connection()
        song = conn.execute('SELECT * FROM songs WHERE id = ?', (song_id,)).fetchone()
        conn.close()
        return dict(song) if song else None

    @staticmethod
    def toggle_favorite(song_id):
        conn = get_db_connection()
        try:
            current = conn.execute('SELECT favorite FROM songs WHERE id = ?', (song_id,)).fetchone()
            if current is None:
                return None
            
            new_status = "1" if current['favorite'] == "0" else "0"
            conn.execute('UPDATE songs SET favorite = ? WHERE id = ?', (new_status, song_id))
            conn.commit()
            
            song = conn.execute('SELECT * FROM songs WHERE id = ?', (song_id,)).fetchone()
            return dict(song)
        finally:
            conn.close()
