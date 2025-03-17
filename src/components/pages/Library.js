import React, { Component } from 'react';
import ListSong from '../ListSong';
import './Library.css';

class Library extends Component {
    state = {
        activeTab: 'favorites'
    };

    handleTabChange = (tab) => {
        this.setState({ activeTab: tab });
    };

    render() {
        const { activeTab } = this.state;
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
                </div>
                <div className="tab-content">
                    {activeTab === 'favorites' && <ListSong onSongSelect={onSongSelect} />}
                    {activeTab === 'uploaded' && <ListSong onSongSelect={onSongSelect} />}
                </div>
            </div>
        );
    }
}

export default Library;
