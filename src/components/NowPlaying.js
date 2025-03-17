import React, { Component } from 'react';
import './NowPlaying.css';
import waves from '../assets/image/Waves.png';

class NowPlaying extends Component {
    state = {
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        error: null
    };

    audioRef = React.createRef();

    componentDidUpdate(prevProps) {
        if (this.props.currentSong !== prevProps.currentSong && this.props.currentSong) {
            this.handleSongChange();
        }
    }

    handleSongChange = async () => {
        try {
            if (this.audioRef.current) {
                await this.audioRef.current.pause();
                this.audioRef.current.load();
                const playPromise = this.audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            this.setState({ isPlaying: true, error: null });
                        })
                        .catch(error => {
                            console.error("Playback error:", error);
                            this.setState({ error: "Failed to play audio", isPlaying: false });
                        });
                }
            }
        } catch (error) {
            console.error("Audio error:", error);
            this.setState({ error: "Audio playback error", isPlaying: false });
        }
    };

    togglePlay = async () => {
        try {
            if (this.audioRef.current) {
                if (this.state.isPlaying) {
                    await this.audioRef.current.pause();
                } else {
                    const playPromise = this.audioRef.current.play();
                    if (playPromise !== undefined) {
                        await playPromise;
                    }
                }
                this.setState(prev => ({ isPlaying: !prev.isPlaying, error: null }));
            }
        } catch (error) {
            console.error("Toggle play error:", error);
            this.setState({ error: "Playback control error", isPlaying: false });
        }
    };

    render() {
        const { currentSong } = this.props;
        const { isPlaying, error } = this.state;

        return (
            <div className="nowPlaying">
                {currentSong && (
                    <>
                        <audio
                            ref={this.audioRef}
                            src={currentSong.source || ''}
                            onError={() => this.setState({ error: "Failed to load audio file" })}
                        />
                        {error && <div className="audioError">{error}</div>}
                        <div className="playingImage">
                            <img src={currentSong.image} alt={currentSong.title} />
                        </div>
                        <div className="playingTitle">
                            <h4>{currentSong.title}</h4>
                            <p>{currentSong.artist}</p>
                        </div>
                        <div className="playerMainActions">
                            <ul>
                                <li><i className="fa-solid fa-backward-step"></i></li>
                                <li onClick={this.togglePlay}>
                                    <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                                </li>
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
                    </>
                )}
            </div>
        );
    }
}

export default NowPlaying;
