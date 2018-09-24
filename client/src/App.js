import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    fetch('https://localhost:5001/api/locations')
      .then(resp => resp.json())
      .then(json => { console.log(json) })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Places I Been!</h1>
        </header>
        <section>
          <section>
            <p>Location</p>
            <p>Date</p>
            <p>Note</p>
            <p>Will I Go Back?</p>
          </section>
        </section>
      </div>
    );
  }
}

export default App;