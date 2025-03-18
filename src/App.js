import React, { Component } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import NowPlaying from './components/NowPlaying';
import Navigationbar from './components/Navigationbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import Library from './components/pages/Library';
import Upload from './components/pages/Upload';

class App extends Component {
  state = {
    currentSong: null
  };

  handleSongSelect = (song) => {
    this.setState({ currentSong: song });
  };

  handleSongUpdate = (updatedSong) => {
    this.setState({ currentSong: updatedSong });
  };

  render() {

    return (
      <Router>
        <div className="container">
          <div className="main">
            <Navigationbar />
            <div className="mainContainer">
              <Sidebar />
              <div className="content-area">
                <Routes>
                  <Route exact path="/" element={<Home onSongSelect={this.handleSongSelect} currentSong={this.state.currentSong} />} />
                  <Route path="/search" element={<Search onSongSelect={this.handleSongSelect} currentSong={this.state.currentSong} />} />
                  <Route
                    path="/library"
                    element={<Library onSongSelect={this.handleSongSelect} currentSong={this.state.currentSong} />}
                  />
                  <Route path="/upload" element={<Upload onSongSelect={this.handleSongSelect} />} />
                </Routes>
              </div>
            </div>
          </div>
          <NowPlaying
            currentSong={this.state.currentSong}
            onSongUpdate={this.handleSongUpdate}
          />
        </div>
      </Router>
    );
  }
}

export default App;
