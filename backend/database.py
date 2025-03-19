import sqlite3
import os

def init_db():
    db_path = os.path.join(os.path.dirname(__file__), 'songs.sqlite')
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    
    # Create songs table
    c.execute('''
        CREATE TABLE IF NOT EXISTS songs (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            album TEXT,
            artist TEXT,
            source TEXT NOT NULL,
            image TEXT,
            favorite TEXT DEFAULT '0',
            counter INTEGER DEFAULT 0,
            replay INTEGER DEFAULT 0
        )
    ''')
    
    # Create downloads table
    c.execute('''
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

    # Create uploads table
    c.execute('''
        CREATE TABLE IF NOT EXISTS uploads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            artist TEXT NOT NULL,
            source TEXT NOT NULL
        )
    ''')
    
    conn.commit()
    conn.close()
