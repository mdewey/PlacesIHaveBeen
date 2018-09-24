import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import moment from 'moment'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      date: new Date(),
      note: '',
      willIGoBack: false,
      locations: []
    }
  }
  
  componentDidMount() {
    fetch('https://localhost:5001/api/locations')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          locations: json
        })
      })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch("https://localhost:5001/api/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "Place": this.state.location,
        "Date": this.state.date,
        "Note": this.state.note,
        "WillIGoBack": this.state.willIGoBack
      })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
    })
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
          <section>
            {this.state.locations.map(location => {
              return <div>
                  <h3>{location.place}</h3>
                  <time>{moment(location.date).format("MMM Do YY")}</time>
                  <p>{location.note}</p>
                  <h6>{location.willIGoBack ? "Yes" : "No"}</h6>

                </div>
            })}
          </section>
        </section>
      </div>
    );
  }
}

export default App;