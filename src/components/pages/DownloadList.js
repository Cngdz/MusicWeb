import React, { Component } from 'react';
import SongInfo from '../SongInfo';
import './ListSong.css';  // Reuse ListSong styles

class DownloadList extends Component {
    state = {
        downloads: [],
        loading: true,
        error: null
    };

    componentDidMount() {
        this.fetchDownloads();
    }

    fetchDownloads = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/downloads');
            const data = await response.json();
            this.setState({
                downloads: data.map(song => ({ ...song, isDownloaded: true })),
                loading: false
            });
        } catch (error) {
            this.setState({ error: 'Failed to fetch downloads', loading: false });
        }
    };

    render() {
        const { downloads, loading, error } = this.state;
        const { onSongSelect } = this.props;

        if (loading) return <div>Loading...</div>;
        if (error) return <div>{error}</div>;

        return (
            <div className="listSong">
                {downloads.map((song) => (
                    <SongInfo
                        key={song.id}
                        {...song}
                        onSongSelect={onSongSelect}
                    />
                ))}
            </div>
        );
    }
}

export default DownloadList;
