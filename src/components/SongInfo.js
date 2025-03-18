import React, { Component } from 'react';
import './SongInfo.css';

class SongInfo extends Component {
    state = {
        downloading: false,
        error: null
    };

    handleClick = () => {
        const { onSongSelect, ...song } = this.props;
        if (onSongSelect) {
            onSongSelect(song);
        }
    };

    handleDownloadClick = async (e) => {
        e.stopPropagation();
        const { id, isDownloaded } = this.props;

        if (isDownloaded) {
            return;
        }

        this.setState({ downloading: true, error: null });

        try {
            const response = await fetch(`http://localhost:5000/api/download/${id}`, {
                method: 'POST'
            });

            if (!response.ok) {
                const data = await response.json();
                if (response.status === 409) {
                    return;
                }
                throw new Error(data.error || 'Download failed');
            }

            // Trigger parent refresh
            if (this.props.onDownloadComplete) {
                this.props.onDownloadComplete();
            }
        } catch (error) {
            console.error('Error downloading song:', error);
            this.setState({ error: error.message });
        } finally {
            this.setState({ downloading: false });
        }
    };

    render() {
        const { title, artist, image, isDownloaded } = this.props;
        const { downloading, error } = this.state;

        return (
            <div className="songInfo" onClick={this.handleClick}>
                <div className="songImage">
                    <img src={image} alt={title} />
                </div>
                <div className="songDetails">
                    <h2>{title}</h2>
                    <h4>{artist}</h4>
                    {error && <p className="error">{error}</p>}
                </div>
                <div className="downloadIcon" onClick={this.handleDownloadClick}>
                    <i className={`fa-solid ${isDownloaded ? 'fa-check' : downloading ? 'fa-spinner fa-spin' : 'fa-download'}`}></i>
                </div>
            </div>
        );
    }
}

export default SongInfo;
