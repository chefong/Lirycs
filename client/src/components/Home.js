import React, { Component } from 'react';
import Chart from './Chart';
import axios from 'axios';
import './Home.css';

const API_KEY = process.env.REACT_APP_API_KEY;

class Home extends Component {

  state = {
    topLyrics: ""
  }

  chooseGreeting() {
    let date = new Date();
    let day = date.getDate();

    return day % 2 == 0 ? "Hey" : "Hello";
  }

  getFirstName(name) {
    return name.substring(0, name.search(" "))
  }

  removeSpecialWords(lyric) {
    let revised = lyric.replace(/This Lyrics is NOT for Commercial use/g, '');
    revised = revised.replace(/\(1409617797032\)/g, '');
    revised = revised.replace(/\*/g, '');
    revised = revised.replace(/\n/g, ' ');
    revised = revised.replace(/...     /g, '');
    revised = revised.replace(/  /g, ' ');
    revised = revised.toLowerCase();

    return revised;
  }

  componentDidMount() {
    let arr = this.props.topTracks.items;
    let trackMap = [];
    for (let i = 0; i < arr.length; ++i) {
      trackMap.push([arr[i].name, arr[i].artists[0].name])
    }

    let topLyrics = "";
    for (let j = 0; j < trackMap.length; ++j) {
      let trackTitle = trackMap[j][0];
      let trackArtist = trackMap[j][1];

      axios.get(`https://cors-anywhere.herokuapp.com/` + `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=json&callback=callback&q_track=${trackTitle}&q_artist=${trackArtist}&apikey=${API_KEY}`)
        .then(res => {
          if (res.data.message.body.lyrics) {
            topLyrics = topLyrics + res.data.message.body.lyrics.lyrics_body;
            topLyrics = this.removeSpecialWords(topLyrics);
            this.setState({topLyrics});
          }
        })
    }
  }

  render() {
    console.log(this.state.topLyrics);
    return (
      <div>
        <div className="greetings-container">
          <h1 id="greetings">{ this.chooseGreeting() } { this.props.userData.display_name ? this.getFirstName(this.props.userData.display_name) : this.props.userData.id }<span className="green">,</span></h1>
        </div>
        <div className="container-fluid info-container">
          <p className="subtitle" id="song-desc">These are your top <span className="green">3</span> tracks on <span className="green">Spotify.</span> Keep scrolling down for more<span className="green">.</span></p>
          <div className="row">
            <div className="col-4">
              <div className="album-art-container">
                <a href={ this.props.topTracks.items[0].external_urls.spotify } target="_blank"><img className="album-art" src={ this.props.topTracks.items[0].album.images[0].url } alt="1st top track"/></a>
                <h6 className="album-name">{ this.props.topTracks.items[0].name }</h6>
              </div>
            </div>
            <div className="col-4">
              <div className="album-art-container">
                <a href={ this.props.topTracks.items[1].external_urls.spotify } target="_blank"><img className="album-art" src={ this.props.topTracks.items[1].album.images[0].url } alt="2nd top track"/></a>
                <h6 className="album-name">{ this.props.topTracks.items[1].name }</h6>
              </div>
            </div>
            <div className="col-4">
              <div className="album-art-container">
                <a href={ this.props.topTracks.items[2].external_urls.spotify } target="_blank"><img className="album-art" src={ this.props.topTracks.items[2].album.images[0].url } alt="3rd top track"/></a>
                <h6 className="album-name">{ this.props.topTracks.items[2].name }</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid chart-container">
          <div className="row">
            <p className="subtitle" id="chart-desc">Here are the <span className="green">lyrics</span> that appear the most in your top <span className="green">Spotify</span> tracks<span className="green">;</span> have a look<span className="green">!</span></p>
            <Chart lyrics={ this.state.topLyrics } />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;