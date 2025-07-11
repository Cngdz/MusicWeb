import React, { Component } from 'react';
import './ListSong.css';
import SongInfo from './SongInfo';
import config from '../config';
const API_URL = config.apiUrl;
class ListSong extends Component {
    state = {
        songs: [],
        downloadedSongs: {},
        loading: true,
        error: null,
    };

    componentDidMount() {
        this.fetchAllSongs();
    }
    fetchAllSongs = async () => {
        try {
            // Fetch downloaded songs first
            console.log(API_URL)
            console.log(`${API_URL}/api/downloads`);
            const downloadResponse = await fetch(`${API_URL}/api/downloads`);
            if (downloadResponse.ok) {
                const downloadedData = await downloadResponse.json();
                const downloadedMap = {};
                downloadedData.forEach(song => {
                    downloadedMap[song.id] = song;
                });
                this.setState({ downloadedSongs: downloadedMap });
            }

            // Then fetch all songs
            const response = await fetch(`${API_URL}/api/songs`);
            const data = await response.json();

            // Merge data with downloaded info
            const mergedSongs = data.map(song => ({
                ...song,
                isDownloaded: !!this.state.downloadedSongs[song.id],
                localPath: this.state.downloadedSongs[song.id]?.local_path
            }));

            this.setState({ songs: mergedSongs, loading: false });
        } catch (error) {
            this.setState({ error: 'Failed to fetch songs', loading: false });
        }
    };

    getFilteredSongs = () => {
        const { filter } = this.props;
        const { songs } = this.state;

        switch (filter) {
            case 'favorites':
                return songs.filter(song => song.favorite === '1');
            case 'downloads':
                return songs.filter(song => song.isDownloaded);
            case 'all':
            default:
                return songs;
        }
    };

    handleSongSelect = (song) => {
        const { downloadedSongs } = this.state;
        const downloadedVersion = downloadedSongs[song.id];

        const songToPlay = downloadedVersion ? {
            ...song,
            localPath: downloadedVersion.local_path
        } : song;

        if (this.props.onSongSelect) {
            this.props.onSongSelect(songToPlay);
        }
    };

    render() {
        const { songs, loading, error } = this.state;
        const { onSongSelect } = this.props;

        if (loading) return <div>Loading...</div>;
        if (error) return <div>{error}</div>;

        const filteredSongs = this.getFilteredSongs();

        return (
            <div className="listSong">
                {filteredSongs.map((song) => (
                    <SongInfo
                        key={song.id}
                        {...song}
                        onSongSelect={() => this.handleSongSelect(song)}
                        onDownloadComplete={this.fetchAllSongs}
                    />
                ))}
            </div>
        );
    }
}

export default ListSong;
