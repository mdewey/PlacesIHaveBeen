import React, { Component } from "react";
import "./App.css";

import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      location: "",
      date: new Date(),
      note: "",
      willIGoBack: false,
      deleteMessage: "", 
      searchTerm:""
    };
  }

  componentDidMount() {
    this.getLatest();
  }

  getLatest = () => {
    fetch("https://localhost:5001/api/locations")
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          locations: json
        });
      });
  };

  handleSearch = e => {
    e.preventDefault();
    console.log(this.state.searchTerm);
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch("https://localhost:5001/api/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Place: this.state.location,
        Date: this.state.date,
        Note: this.state.note,
        WillIGoBack: this.state.willIGoBack
      })
    })
      .then(resp => resp.json())
      .then(_ => {
        this.getLatest();
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCheckbox = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  handleCheckingInAgainEvent = id => {
    fetch(`https://localhost:5001/api/locations/${id}`, {
      method: "PATCH"
    })
      .then(resp => resp.json())
      .then(() => {
        this.getLatest();
      });
  };

  handleDeleteEvent = location => {
    fetch(`https://localhost:5001/api/locations/${location.id}`, {
      method: "DELETE"
    })
      .then(resp => resp.json())
      .then(json => {
        this.getLatest();
        if (json.success) {
          this.setState({ deleteMessage: `${location.place} was removed` }, () => {
            setTimeout(() => { this.setState({ deleteMessage: "" }) }, 2500)
          })
        }
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Places I've Been!</h1>
          <form onSubmit={this.handleSearch}>
            <input type="search" name="searchTerm" placeholder="Search my locations..." onChange={this.handleChange} />
            <button>search</button>
          </form>
        </header>

        <section className="content">
          <form onSubmit={this.handleSubmit} className="visitedLocations">
            <p>Location</p>
            <input
              type="text"
              placeholder="location..."
              name="location"
              onChange={this.handleChange}
            />
            <p>Date</p>
            <input type="date" name="date" onChange={this.handleChange} />
            <p>Note</p>
            <textarea
              height="100"
              width="300"
              name="note"
              onChange={this.handleChange}
            />
            <p>Will I Go Back?</p>
            <input
              type="checkbox"
              name="willIGoBack"
              onChange={this.handleCheckbox}
            />
            <button>Submit</button>
          </form>
          <h3>{this.state.deleteMessage}</h3>
          <section>
            {this.state.locations.map(location => {
              return (
                <div key={location.id}>
                  <h3>{location.place}</h3>
                  <time>{moment(location.date).calendar()}</time>
                  <p>Times Visited? {location.timesVisited}</p>
                  <p>{location.note}</p>
                  <h6>Will I go back? {location.willIGoBack ? "Yes" : "No"}</h6>
                  <button
                    onClick={() => this.handleCheckingInAgainEvent(location.id)}
                  >
                    Check In Again
                  </button>
                  <button onClick={() => this.handleDeleteEvent(location)}>
                    Remove/ Forget
                  </button>
                </div>
              );
            })}
          </section>
        </section>
      </div>
    );
  }
}

export default App;
