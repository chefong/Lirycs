import React, { Component } from 'react';
import './Home.css';

const API_KEY = process.env.API_KEY;

class Home extends Component {

  topLyrics = "";

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

    for (let j = 0; j < trackMap.length; ++j) {

    }
  }

  render() {
    return (
      <div>
        <div className="greetings-container">
          <h1 id="greetings">{ this.chooseGreeting() } { this.props.userData.display_name ? this.getFirstName(this.props.userData.display_name) : this.props.userData.id }<span className="green">,</span></h1>
        </div>
        <div className="container-fluid info-container">
          <p id="songs">Here are your top <span className="green">3</span> tracks on <span className="green">Spotify.</span> Keep scrolling down for more<span className="green">.</span></p>
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
      </div>
    );
  }
}

export default Home;