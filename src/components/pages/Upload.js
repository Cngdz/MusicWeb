import React, { Component } from 'react';
import './Upload.css';
import config from '../../config';
const API_URL = config.apiUrl;
class Upload extends Component {
    state = {
        title: '',
        artist: '',
        file: null,
        uploading: false,
        error: null,
        success: null // Add success state
    };

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFileChange = (e) => {
        const file = e.target.files[0];
        this.setState({ file });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ uploading: true, error: null, success: null });

        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('artist', this.state.artist);
        formData.append('file', this.state.file);

        try {
            const response = await fetch(`${API_URL}/api/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            console.log('Upload successful:', data);
            this.setState({ success: 'Upload successful!' });
        } catch (error) {
            this.setState({ error: error.message });
        } finally {
            this.setState({ uploading: false });
        }
    };

    render() {
        const { title, artist, uploading, error, success } = this.state;
        return (
            <div className="page-transition">
                <div className="upload-container">
                    <div className="upload-header">
                        <i className="fa-solid fa-cloud-upload-alt"></i>
                        <h1>Upload Music</h1>
                    </div>

                    <form onSubmit={this.handleSubmit} className="upload-form">
                        <div className="form-group">
                            <label>
                                <i className="fa-solid fa-music"></i> Title:
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <i className="fa-solid fa-user"></i> Artist:
                            </label>
                            <input
                                type="text"
                                name="artist"
                                value={artist}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="file-input-label">
                                <i className="fa-solid fa-file-audio"></i>
                                <span>Choose File</span>
                                <input
                                    type="file"
                                    accept="audio/*"
                                    onChange={this.handleFileChange}
                                    required
                                />
                            </label>
                        </div>

                        {error && <div className="error">{error}</div>}
                        {success && <div className="success">{success}</div>}

                        <button type="submit" disabled={uploading}>
                            {uploading ? (
                                <><i className="fa-solid fa-spinner fa-spin"></i> Uploading...</>
                            ) : (
                                <><i className="fa-solid fa-upload"></i> Upload</>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Upload;
