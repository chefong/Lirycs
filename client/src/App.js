import React, { Component } from 'react';
import Button from './components/Button';
import queryString from 'query-string';
import './App.css';

class App extends Component {

  state = {
    userData: {
      id: undefined,
      country: undefined
    }
  }

  componentDidMount() {
    let token = queryString.parse(window.location.search).access_token;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + token}
    }).then(res => res.json())
    .then(userData => this.setState({userData}));
  }

  render() {
    console.log(this.state.userData.country);
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
