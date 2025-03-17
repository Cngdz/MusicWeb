import React, { Component } from 'react';
import './SongInfo.css';

class SongInfo extends Component {
    handleClick = () => {
        const { onSongSelect, ...song } = this.props;
        if (onSongSelect) {
            onSongSelect(song);
        }
    };

    render() {
        const { title, album, artist, image, duration, favorite, counter, replay } = this.props;
        return (
            <div className="songInfo" onClick={this.handleClick}>
                <div className="songImage">
                    <img src={image} alt={title} />
                </div>
                <div className="songDetails">
                    <h2>{title}</h2>
                    <h4>{artist}</h4>
                </div>
                <div className="downloadIcon">
                    <i className="fa-solid fa-download"></i>
                </div>
            </div>
        );
    }
}

export default SongInfo;
