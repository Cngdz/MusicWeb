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
  render() {
    const lyrics = `Blinding lights
    I've been tryna call
    I've been on my own for long enough
    Maybe you can show me how to love, maybe
    I'm going through withdrawals
    You don't even have to do too much
    You can turn me on with just a touch, baby
    I look around and Sin City's cold and empty
    No one's around to judge me
    I can't see clearly when you're gone
    I said, ooh, I'm blinded by the lights
    No, I can't sleep until I feel your touch
    I said, ooh, I'm drowning in the night
    Oh, when I'm like this, you're the one I trust
    Hey, hey, hey
    I'm running out of time
    'Cause I can see the sun light up the sky
    So I hit the road in overdrive, baby, oh
    The city's cold and empty
    No one's around to judge me
    I can't see clearly when you're gone
    I said, ooh, I'm blinded by the lights
    No, I can't sleep until I feel your touch
    I said, ooh, I'm drowning in the night
    Oh, when I'm like this, you're the one I trust
    I'm just walking by to let you know (by to let you know)
    I can never say it on the phone (say it on the phone)
    Will never let you go this time (ooh)
    I said, ooh, I'm blinded by the lights
    No, I can't sleep until I feel your touch
    Hey, hey, hey
    Hey, hey, hey
    I said, ooh, I'm blinded by the lights
    No, I can't sleep until I feel your touch`;

    return (
      <Router>
        <div className="container">
          <div className="main">
            <Navigationbar />
            <div className="mainContainer">
              <Sidebar />
              <div className="content-area">
                <Routes>
                  <Route exact path="/" element={<Home lyrics={lyrics} />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/upload" element={<Upload />} />
                </Routes>
              </div>
            </div>
          </div>
          <NowPlaying />
        </div>
      </Router>
    );
  }
}

export default App;
