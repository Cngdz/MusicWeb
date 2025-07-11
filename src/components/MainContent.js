import React, { Component } from 'react';
import './MainContent.css';
import SongInfo from './SongInfo';
import ListSong from './ListSong';
import imageee from '../assets/image/vechibi1-9103.jpg'

class MainContent extends Component {
    render() {
        const { currentSong, onSongSelect } = this.props;

        const displaySong = currentSong || {
            title: "Select a song",
            album: "",
            artist: "Click any song to play",
            image: imageee
        };

        return (
            <div className="mainHighlights">
                <div className="highlights">
                    <div class="music-card">
                        <div class="music-info">
                            <h2 class="song-title">{displaySong.title}</h2>
                            <p class="artist">{displaySong.artist}</p>
                            <p class="album">Album:     {displaySong.album}</p>

                        </div>
                    </div>

                    <div className="highlightImage">
                        <img src={displaySong.image} alt={displaySong.title} />
                    </div>
                    <div className='ListSong'>
                        <ListSong
                            filter="all"
                            onSongSelect={onSongSelect}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContent;
