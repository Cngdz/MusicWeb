import React, { Component } from 'react';
import './ListSong.css';
import SongInfo from './SongInfo';

class ListSong extends Component {
    state = {
        songs: [],
        loading: true,
        error: null
    };

    componentDidMount() {
        this.fetchSongs();
    }

    fetchSongs = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/songs');
            const data = await response.json();
            this.setState({ songs: data, loading: false });
        } catch (error) {
            this.setState({ error: 'Failed to fetch songs', loading: false });
        }
    };

    render() {
        const { songs, loading, error } = this.state;
        const { onSongSelect } = this.props;

        if (loading) return <div>Loading...</div>;
        if (error) return <div>{error}</div>;

        return (
            <div className="listSong">
                {songs.map((song) => (
                    <SongInfo key={song.id} {...song} onSongSelect={onSongSelect} />
                ))}
            </div>
        );
    }
}

export default ListSong;
