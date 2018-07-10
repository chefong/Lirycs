import React, { Component } from 'react';
import Button from './components/Button';
import Home from './components/Home';
import queryString from 'query-string';
import './App.css';

class App extends Component {

  state = {
    userData: {},
    topTracks: {}
  }

  componentDidMount() {
    let token = queryString.parse(window.location.search).access_token;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + token}
    }).then(res => res.json())
    .then(userData => this.setState({userData}));

    fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers: {'Authorization': 'Bearer ' + token}
    }).then(res => res.json())
    .then(topTracks => this.setState({topTracks}));
  }

  render() {
    console.log(this.state.topTracks);
    if ((this.state.userData.display_name || this.state.userData.id) && this.state.topTracks.items) {
      return (
        <Home userData={ this.state.userData } topTracks={ this.state.topTracks }/>
      );
    }
    else {
      return (
        <div className="App">
          <img id="logo" src={ require('./imgs/Lirycs logo.png')} alt="Lirycs logo"/>
          <br/>
          <Button/>
        </div>
      );
    }
  }
}

export default App;
