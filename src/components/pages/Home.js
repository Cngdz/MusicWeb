import React, { Component } from 'react';
import MainContent from '../MainContent';

class Home extends Component {
    render() {
        const { onSongSelect, currentSong } = this.props;
        return (
            <div className="home-page">
                <div className="page-transition">
                    <MainContent currentSong={currentSong} onSongSelect={onSongSelect} />
                </div>
            </div>
        );
    }
}

export default Home;
