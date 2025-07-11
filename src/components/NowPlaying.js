import React, { Component } from 'react';
import './NowPlaying.css';
import waves from '../assets/image/Waves.png';
import config from '../config';
const API_URL = config.apiUrl;

class NowPlaying extends Component {
    state = {
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        error: null,
        isFavorite: false, // Add new state for favorite
        localSource: null // Add new state for local source
    };

    audioRef = React.createRef();

    formatTime = (seconds) => {
        if (!seconds) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    componentDidMount() {
        if (this.audioRef.current) {
            this.audioRef.current.addEventListener('loadedmetadata', () => {
                this.setState({ duration: this.audioRef.current.duration });
            });

            this.audioRef.current.addEventListener('timeupdate', () => {
                this.setState({ currentTime: this.audioRef.current.currentTime });
            });

            this.audioRef.current.addEventListener('canplaythrough', () => {
                this.setState({ error: null });
            });

            this.audioRef.current.addEventListener('waiting', () => {
                console.log('Audio is buffering...');
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentSong !== this.props.currentSong) {
            this.setState({
                isFavorite: this.props.currentSong?.favorite === '1',
                isPlaying: false,
                error: null
            });
            this.checkLocalSource(this.props.currentSong.id);
        }
    }

    checkLocalSource = async (songId) => {
        try {
            const response = await fetch(`${API_URL}/api/download/${songId}`);
            if (response.ok) {
                const data = await response.json();
                const filename = data.local_path.replace(/^.*[\\/]/, '');
                console.log('Local source:', filename);
                const localUrl = `${API_URL}/api/files/${encodeURIComponent(filename)}`;
                // const localUrl = `${API_URL}/api/files/${data.local_path.split('/').pop()}`;
                this.setState({ localSource: localUrl });
                return;
            }
            this.setState({ localSource: null });
        } catch (error) {
            console.error('Error checking local source:', error);
            this.setState({ localSource: null });
        }
    };

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
            this.setState({ error: "Audio playback erro r", isPlaying: false });
        }
    };

    togglePlay = async () => {
        try {
            if (!this.audioRef.current) return;

            if (this.state.isPlaying) {
                await this.audioRef.current.pause();
                this.setState({ isPlaying: false });
            } else {
                // Wait for audio to be ready
                if (this.audioRef.current.readyState < 3) {
                    await new Promise((resolve) => {
                        const handleCanPlay = () => {
                            this.audioRef.current.removeEventListener('canplaythrough', handleCanPlay);
                            resolve();
                        };
                        this.audioRef.current.addEventListener('canplaythrough', handleCanPlay);
                        this.audioRef.current.load();
                    });
                }

                const playPromise = this.audioRef.current.play();
                if (playPromise !== undefined) {
                    await playPromise;
                    this.setState({ isPlaying: true, error: null });
                }
            }
        } catch (error) {
            console.error("Toggle play error:", error);
            this.setState({ error: "Playback control error", isPlaying: false });
        }
    };

    handleFavoriteClick = async () => {
        const { currentSong } = this.props;
        if (!currentSong) return;

        // Optimistically update UI
        this.setState(prevState => ({ isFavorite: !prevState.isFavorite }));

        try {
            const response = await fetch(`${API_URL}/api/song/${currentSong.id}/favorite`, {
                method: 'POST'
            });

            if (!response.ok) {
                // Revert UI if request fails
                this.setState(prevState => ({ isFavorite: !prevState.isFavorite }));
                throw new Error('Failed to toggle favorite');
            }

            const updatedSong = await response.json();
            if (this.props.onSongUpdate) {
                this.props.onSongUpdate(updatedSong);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    render() {
        const { currentSong } = this.props;
        const { isPlaying, error, isFavorite, duration, currentTime, localSource } = this.state;
        console.log('Local source:', localSource);
        console.log('Current song:', currentSong);
        console.log('Current song source:', currentSong?.source);
        console.log('Current song duration:', currentSong?.duration);
        // Get the audio source - prioritize local path
        const filename = currentSong?.localPath ? currentSong.localPath.split('\\').pop().split('/').pop() : '';
        const imageFilename = currentSong?.image ? currentSong.image.split('\\').pop().split('/').pop() : '';
        const audioSource = filename
            ? `${API_URL}/api/files/${encodeURIComponent(filename)}`
            : (localSource || currentSong?.source || '');

        console.log('Audio source:', audioSource);

        const imageSource = currentSong?.isDownloaded
            ? `${API_URL}/api/files/${encodeURIComponent(imageFilename)}`
            : currentSong?.image;

        return (
            <div className="nowPlaying">
                {currentSong && (
                    <>
                        <audio
                            ref={this.audioRef}
                            src={audioSource}
                            preload="auto"
                            onLoadStart={() => console.log('Loading audio...')}
                            onCanPlayThrough={() => console.log('Audio ready to play')}
                            onError={() => this.setState({ error: "Failed to load audio file" })}
                        />
                        {error && <div className="audioError">{error}</div>}
                        <div className="playingImage">
                            <img src={imageSource} alt={currentSong.title} />
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
                            <p>{this.formatTime(currentTime)} / {this.formatTime(currentSong?.duration)}</p>
                        </div>
                        <div className="moreActions">
                            <ul>
                                <li onClick={this.handleFavoriteClick}>
                                    <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>
                                </li>
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
