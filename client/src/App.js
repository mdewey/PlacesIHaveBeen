import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      date: new Date(),
      note: '',
      willIGoBack: false
    }
  }
  
  componentDidMount() {
    fetch('https://localhost:5001/api/locations')
      .then(resp => resp.json())
      .then(json => { console.log(json) })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log("we've submitted...")
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheckbox = (e) => {
    this.setState({
      [e.target.name]: e.target.checked
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Places I Been!</h1>
        </header>
        <section>
          <form onSubmit={this.handleSubmit}>
            <p>Location</p>
            <input type="text" placeholder="location..." name="location" onChange={this.handleChange}/>
            <p>Date</p>
            <input type="date" name="date" onChange={this.handleChange}/>
            <p>Note</p>
            <textarea height="100" width="300" name="note" onChange={this.handleChange}></textarea>
            <p>Will I Go Back?</p>
            <input type="checkbox" name="willIGoBack" onChange={this.handleCheckbox}/>
            <button>Submit</button>
          </form>
        </section>
      </div>
    );
  }
}

export default App;