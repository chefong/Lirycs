import React, { Component } from 'react';
import './Home.css';

class Home extends Component {

  state = {
    trackMap: []
  }

  getFirstName(name) {
    return name.substring(0, name.search(" "))
  }

  componentDidMount() {
    console.log("storeTracks being called");

    let arr = this.props.topTracks.items;
    let trackMap = []
    for (let i = 0; i < arr.length; ++i) {
      trackMap.push([arr[i].name, arr[i].artists[0].name])
    }
    console.log(trackMap);
    this.setState({trackMap})
  }

  render() {
    console.log(this.state.trackMap);
    return (
      <div>
        <div className="greetings-container">
          <h1 id="greetings">Hey { this.props.userData.display_name ? this.getFirstName(this.props.userData.display_name) : this.props.userData.id }<span className="green">,</span></h1>
        </div>
        <div className="container-fluid info-container">
          <p id="songs">Here are your top <span className="green">3</span> tracks on <span className="green">Spotify.</span> Keep scrolling down for more<span className="green">.</span></p>
          <div className="row">
            <div className="col-4">
              <div className="album-art-container">
                <a href={ this.props.topTracks.items[0].external_urls.spotify } target="_blank"><img className="album-art" src={ this.props.topTracks.items[0].album.images[0].url }/></a>
                <h6 className="album-name">{ this.props.topTracks.items[0].name }</h6>
              </div>
            </div>
            <div className="col-4">
              <div className="album-art-container">
                <a href={ this.props.topTracks.items[1].external_urls.spotify } target="_blank"><img className="album-art" src={ this.props.topTracks.items[1].album.images[0].url }/></a>
                <h6 className="album-name">{ this.props.topTracks.items[1].name }</h6>
              </div>
            </div>
            <div className="col-4">
              <div className="album-art-container">
                <a href={ this.props.topTracks.items[2].external_urls.spotify } target="_blank"><img className="album-art" src={ this.props.topTracks.items[2].album.images[0].url }/></a>
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