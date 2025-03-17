import React, { Component } from 'react';
import './MainContent.css';
import highlightImage from '../assets/image/vechibi1-9103.jpg';
import SongInfo from './SongInfo';
import ListSong from './ListSong';
class MainContent extends Component {
    render() {
        const { lyrics } = this.props;
        return (
            <div className="mainHighlights">
                <div className="highlights">
                    <SongInfo title="Blinding Lights" artist="The Weeknd" lyrics={lyrics} />
                    <div className="highlightImage">
                        <img src={highlightImage} alt="Highlight" />
                    </div>
                    <div className='ListSong'>
                        <ListSong />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContent;
