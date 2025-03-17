from flask import Blueprint, jsonify
from models import Song

api = Blueprint('api', __name__)

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
