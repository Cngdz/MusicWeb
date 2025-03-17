import React, { Component } from 'react';
import MainContent from '../MainContent';

class Home extends Component {
    render() {
        const { lyrics } = this.props;
        return (
            <div className="home-page">
                <div className="page-transition">
                    <MainContent lyrics={lyrics} />
                </div>
            </div>
        );
    }
}

export default Home;
