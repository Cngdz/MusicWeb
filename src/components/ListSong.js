import React, { Component } from 'react';
import './ListSong.css';
import image from '../assets/image/vechibi1-9103.jpg';
class   ListSong extends Component {
    render() {
        const songs = [
            { title: 'Intentions', artist: 'Justin Bieber', image: image },
            { title: 'What A Man Gotta Do', artist: 'Jonas Brothers', image: image },
            { title: 'Closer', artist: 'Chain Smokers', image: image },
            { title: 'To Die For', artist: 'Sam Smith', image: image },
            { title: 'Heat Waves', artist: 'Glass Animals', image: image },
            { title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', image: image },
            { title: 'Peaches', artist: 'Justin Bieber', image: image },
            { title: 'Love Yourself', artist: 'Justin Bieber', image: image }
        ];

        return (
            <div className="listSong">
                {songs.map((song, index) => (
                    <div className="songItem" key={index}>
                        <div className="songImage">
                            <img src={song.image} alt={song.title} />
                        </div>
                        <div className="songDetails">
                            <h4>{song.title}</h4>
                            <p>{song.artist}</p>
                        </div>
                        <div className="downloadIcon">
                            <i className="fa-solid fa-arrow-down"></i>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default ListSong;
