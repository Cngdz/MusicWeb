import React, { Component } from 'react';
import profileavt from '../assets/image/vechibi1-9103.jpg';
import './Navigationbar.css';

class Navigationbar extends Component {
    render() {
        return (
            <nav>
                <div className="logo">
                    <i className="fa-solid fa-headphones"></i>
                </div>
                <div className="userSettings">
                    <ul>
                        <li><i className="fa-solid fa-sliders"></i></li>
                        <li><i className="fa-regular fa-bell"></i></li>
                        <li>
                            <p>The Programmer</p>
                            <img src={profileavt} alt="Profile" />
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navigationbar;
