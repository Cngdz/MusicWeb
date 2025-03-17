import sqlite3

def get_db_connection():
    conn = sqlite3.connect('./songs.sqlite')
    conn.row_factory = sqlite3.Row
    return conn

class Song:
    @staticmethod
    def get_all_songs():
        conn = get_db_connection()
        songs = conn.execute('SELECT * FROM songs').fetchall()
        conn.close()
        # Return source URL directly since it's already a full URL
        return [dict(song) for song in songs]

    @staticmethod
    def get_song_by_id(song_id):
        conn = get_db_connection()
        song = conn.execute('SELECT * FROM songs WHERE id = ?', (song_id,)).fetchone()
        conn.close()
        return dict(song) if song else None
