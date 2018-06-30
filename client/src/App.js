import React, { Component } from 'react';
import Button from './components/Button';
import queryString from 'query-string';
import './App.css';

class App extends Component {

  componentDidMount() {
    let token = queryString.parse(window.location.search).access_token;
    console.log(token);
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + token}
    }).then(res => res.json())
    .then(userData => console.log(userData));
  }

  render() {
    return (
      <div className="App">
        <img id="logo" src={ require('./imgs/Lirycs logo.png')} alt="Lirycs logo"/>
        <br/>
        <Button/>
      </div>
    );
  }
}

export default App;
