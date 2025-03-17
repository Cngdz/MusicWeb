import React, { Component } from 'react';
import './SongInfo.css';

class SongInfo extends Component {
    render() {
        const { title, artist, lyrics } = this.props;
        return (
            <div className="songInfo">
                <div className="songDetails">
                    <h2>{title}</h2>
                    <h4>{artist}</h4>
                </div>
                <div className="lyricsContainer">
                    <div className="lyrics">
                        {lyrics.split('\n').map((line, index) => (
                            <p key={index}>{line}</p>   
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default SongInfo;
