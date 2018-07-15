import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    return(
      <input 
        id="spotify-button" 
        type="image" src={require("../imgs/connect-spotify-button.png")}
        alt="Connect With Spotify"
        onClick={ () => window.location='https://lirycs-backend.herokuapp.com/auth/spotify'}
      />
    );
  }
}

export default Button;