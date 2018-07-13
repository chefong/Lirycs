import React, { Component } from 'react';
// import Chart from './Chart';
import axios from 'axios';
import './Home.css';

const API_KEY = process.env.REACT_APP_API_KEY;

let ZingChart = require('zingchart-react').core;

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

  componentDidMount() {
    let arr = this.props.topTracks.items;
    let trackMap = [];
    for (let i = 0; i < arr.length; ++i) {
      trackMap.push([arr[i].name, arr[i].artists[0].name])
    }

    console.log(API_KEY);

    // axios.get(`https://cors-anywhere.herokuapp.com/` + `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=json&callback=callback&q_track=${trackMap[0][0]}&q_artist=${trackMap[0][1]}&apikey=${API_KEY}`, {
    //   headers: { 
    //     'Accept': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //     'Access-Control-Allow-Headers' : 'Content-Type'
    //   }})
    //   .then(res => {
    //     console.log(res);
    // })

    let topLyrics = "";
    for (let j = 0; j < trackMap.length; ++j) {
      let trackTitle = trackMap[j][0];
      let trackArtist = trackMap[j][1];

      axios.get(`https://cors-anywhere.herokuapp.com/` + `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=json&callback=callback&q_track=${trackTitle}&q_artist=${trackArtist}&apikey=${API_KEY}`)
        .then(res => {
          console.log(res);
          if (res.data.message.body.lyrics) {
            // console.log(res.data.message.body.lyrics.lyrics_body)
            topLyrics = topLyrics + res.data.message.body.lyrics.lyrics_body;
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
          <p className="subtitle" id="song-desc">Here are your top <span className="green">3</span> tracks on <span className="green">Spotify.</span> Keep scrolling down for more<span className="green">.</span></p>
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
          <div className="row">
            <p className="subtitle" id="chart-desc">These are the <span className="green">lyrics</span> that appear most frequently in your top <span className="green">Spotify</span> tracks<span className="green">;</span> have a look<span className="green">!</span></p>
            <div className="chart-container">
              <ZingChart 
                id="myChart"
                height="500" 
                width="800"
                theme="dark"
                data={
                  { 
                    type: 'wordcloud',
                    options: {
                      text: this.state.topLyrics,
                      maxItems: 50,
                      aspect: 'spiral',
                      colorType: 'palette',
                      palette: ['#1db954', '#0b6623', '#9dc183', '#c7ea46', '#3f704d', '#00A86B', '#8F9779', '#A9BA9D', '#98FB98', '#01796F', '#D0F0C0', '#00A572', '#4B5320', '#50C878', '#39FF14'],
                      style: {
                        fontFamily: 'Catamaran',
                        tooltip: {
                          text: '%text: %hits',
                          visible: true,
                          alpha: 0.9,
                          backgroundColor: 'black',
                          borderColor: 'none',
                          borderRadius: 2,
                          fontColor: 'white',
                          fontFamily: 'Arial',
                          fontSize: 14,
                          textAlpha: 1,
                        }
                      }
                    } 
                  }
                } 
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;