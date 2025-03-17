import React, { Component } from 'react';
import './NowPlaying.css';
import waves from '../assets/image/Waves.png';
class NowPlaying extends Component {
    render() {
        return (
            <div className="nowPlaying">
                <div className="playingImage">
                    <img src="./images/intentions.jpg" alt="Intentions" />
                </div>
                <div className="playingTitle">
                    <h4>Intentions</h4>
                    <p>Justin Bieber</p>
                </div>
                <div className="playerMainActions">
                    <ul>
                        <li><i className="fa-solid fa-backward-step"></i></li>
                        <li><i className="fa-solid fa-play"></i></li>
                        <li><i className="fa-solid fa-forward-step"></i></li>
                    </ul>
                </div>
                <div className="waves">
                    <img src={waves} alt="Waves" />
                    <p>3:34</p>
                </div>
                <div className="moreActions">
                    <ul>
                        <li><i className="fa-regular fa-heart"></i></li>
                        <li><i className="fa-solid fa-volume-high"></i></li>
                        <li><i className="fa-solid fa-repeat"></i></li>
                        <li><i className="fa-solid fa-shuffle"></i></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default NowPlaying;
