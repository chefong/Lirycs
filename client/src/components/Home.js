import React, { Component } from 'react';
import './Home.css';

class Home extends Component {

  getFirstName(name) {
    return name.substring(0, name.search(" "))
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 id="greetings"><em>Hey { this.props.userData.display_name ? this.getFirstName(this.props.userData.display_name) : this.props.userData.id },</em></h1>
        <h6 id="songs">Here are your top 3 songs on <span id="spotify-name">Spotify</span>!</h6>
        <div className="row">
          <div className="col-4">
            <div className="circle"><span className="track-name">{ this.props.topTracks.items[0].name }</span></div>
          </div>
          <div className="col-4">
            <div className="circle" id="special-circle"><span className="track-name">{ this.props.topTracks.items[1].name }</span></div>
          </div>
          <div className="col-4">
            <div className="circle"><span className="track-name">{ this.props.topTracks.items[2].name }</span></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;