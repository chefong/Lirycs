import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <a href="http://localhost:5000/auth/spotify">
          <button>Login with spotify</button>
        </a>
      </div>
    );
  }
}

export default App;
