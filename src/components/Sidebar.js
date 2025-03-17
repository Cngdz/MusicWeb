import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component {
    render() {
        return (
            <div className="sideNav">
                <div className="sideNavIcons">
                    <ul>
                        <li>
                            <NavLink to="/" exact>
                                <i className="fa-solid fa-house"></i> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/search">
                                <i className="fa-solid fa-magnifying-glass"></i> Search
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/library">
                                <i className="fa-solid fa-music"></i> Library
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/upload">
                                <i className="fa-solid fa-upload"></i> Upload
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="socials">
                    <ul>
                        <li><i className="fa-brands fa-instagram"></i></li>
                        <li><i className="fa-brands fa-x-twitter"></i></li>
                        <li><i className="fa-solid fa-play"></i></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
