import React, { Component } from 'react';
import ListSong from '../ListSong';
import './Library.css';
import config from '../../config';
const API_URL = config.apiUrl;
class Library extends Component {
    state = {
        activeTab: 'favorites',
        downloads: [],
        uploads: [],
        loading: false,
        error: null
    };

    componentDidMount() {
        this.fetchUploads();
    }

    fetchUploads = async () => {
        this.setState({ loading: true });
        try {
            const response = await fetch(`${API_URL}/api/uploads`);
            const data = await response.json();
            this.setState({ uploads: data, loading: false });
        } catch (error) {
            this.setState({ error: 'Failed to fetch uploads', loading: false });
        }
    };

    fetchDownloads = async () => {
        this.setState({ loading: true });
        try {
            const response = await fetch(`${API_URL}/api/downloads`);
            const data = await response.json();
            this.setState({ downloads: data, loading: false });
        } catch (error) {
            this.setState({ error: 'Failed to fetch downloads', loading: false });
        }
    };

    handleTabChange = (tab) => {
        this.setState({ activeTab: tab });
        if (tab === 'downloads') {
            this.fetchDownloads();
        } else if (tab === 'uploaded') {
            this.fetchUploads();
        }
    };

    render() {
        const { activeTab, downloads, uploads, loading, error } = this.state;
        const { onSongSelect } = this.props;
        return (
            <div className="page-transition">
                <h1>Your Library</h1>
                <div className="library-tabs">
                    <button
                        className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
                        onClick={() => this.handleTabChange('favorites')}
                    >
                        <i className="fa-solid fa-heart"></i> Favorites
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'uploaded' ? 'active' : ''}`}
                        onClick={() => this.handleTabChange('uploaded')}
                    >
                        <i className="fa-solid fa-upload"></i> Uploaded
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'downloads' ? 'active' : ''}`}
                        onClick={() => this.handleTabChange('downloads')}
                    >
                        <i className="fa-solid fa-download"></i> Downloads
                    </button>
                </div>
                <div className="tab-content">
                    {activeTab === 'favorites' && <ListSong filter="favorites" onSongSelect={onSongSelect} />}
                    {activeTab === 'uploaded' && (
                        loading ? (
                            <div>Loading uploads...</div>
                        ) : error ? (
                            <div className="error">{error}</div>
                        ) : (
                            <div className="listSong">
                                {uploads.map(song => (
                                    <div key={song.id} className="songInfo" onClick={() => onSongSelect(song)}>
                                        <div className="songImage">
                                            <img src={song.image} alt={song.title} />
                                        </div>
                                        <div className="songDetails">
                                            <h2>{song.title}</h2>
                                            <h4>{song.artist}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                    {activeTab === 'downloads' && (
                        loading ? (
                            <div>Loading downloads...</div>
                        ) : error ? (
                            <div className="error">{error}</div>
                        ) : (
                            <div className="listSong">
                                {downloads.map(song => {
                                    const filename = song.local_path.split('\\').pop().split('/').pop();
                                    const imageFilename = song.image.split('\\').pop().split('/').pop();
                                    const songWithLocalPaths = {
                                        ...song,
                                        isDownloaded: true,
                                        source: `${API_URL}/api/files/${encodeURIComponent(filename)}`,
                                        image: `${API_URL}/api/files/${encodeURIComponent(imageFilename)}`
                                    };
                                    return (
                                        <div key={song.id} className="songInfo" onClick={() => onSongSelect(songWithLocalPaths)}>
                                            <div className="songImage">
                                                <img src={songWithLocalPaths.image} alt={song.title} />
                                            </div>
                                            <div className="songDetails">
                                                <h2>{song.title}</h2>
                                                <h4>{song.artist}</h4>
                                            </div>
                                            <div className="downloadIcon">
                                                <i className="fa-solid fa-check"></i>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}

export default Library;
