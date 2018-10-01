import React, { Component } from 'react';

import moment from "moment";

import Auth from '../Auth/Auth';
const auth = new Auth();


class
    HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            location: "",
            // date: new Date(),
            note: "",
            willIGoBack: false,
            deleteMessage: "",
            searchTerm: "",
            authed: {
                isLoggedIn: false
            }
        };
    }

    componentDidMount() {
        if (auth.isAuthenticated()) {
            this.getLatest();
            auth.getProfile((err, profile) => {
                this.setState({
                    authed: {
                        isLoggedIn: true,
                        profile
                    }
                })
            })
        }
    }

    getLatest = () => {
        fetch("https://localhost:5001/api/locations", {
            headers: {
                "Authorization": "Bearer " + auth.getAccessToken()
            }
        })
            .then(resp => resp.json())
            .then(json => {
                this.setState({
                    locations: json
                });
            });
    };

    handleSearch = e => {
        e.preventDefault();
    }

    handleSubmit = e => {
        e.preventDefault();
        fetch("https://localhost:5001/api/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.getAccessToken()
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
                this.setState({
                    location:"",
                    note:"", 
                    willIGoBack:false
                })
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
            method: "PATCH",
            headers: {
                "Authorization": "Bearer " + auth.getAccessToken()
            }
        })
            .then(resp => resp.json())
            .then(() => {
                this.getLatest();
            });
    };

    handleDeleteEvent = location => {
        fetch(`https://localhost:5001/api/locations/${location.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.getAccessToken()
            }
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

    login = () => {
        auth.login();
    }

    logout = () => {
        auth.logout();
    }
    render() {
        let button = <h3></h3>;

        if (this.state.authed.isLoggedIn) {
            button = (
                <h3>
                    Welcome {this.state.authed.profile.given_name}!
                    <a onClick={this.logout} className="logout-button">not you?</a> 
                </h3>

            )
        } 
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Places I've Been!</h1>
                    {button}
                    {/* <form onSubmit={this.handleSearch}>
                        <input type="search" name="searchTerm" placeholder="Search my locations..." onChange={this.handleChange} />
                        <button>search</button>
                    </form> */}
                </header>

                <section className="content">
                    <section className="left-col">

                        <form onSubmit={this.handleSubmit} className="visitedLocations">
                            <p>Location</p>
                            <input
                                type="text"
                                placeholder="location..."
                                name="location"
                                onChange={this.handleChange}
                                value={this.state.location}
                            />
                            {/* <p>Date</p>
                        <input type="date" name="date" onChange={this.handleChange} /> */}
                            <p>Note</p>
                            <textarea
                                height="100"
                                width="300"
                                name="note"
                                onChange={this.handleChange}
                                value={this.state.note}
                            />
                            <p>Will I Go Back?</p>
                            <input
                                type="checkbox"
                                name="willIGoBack"
                                onChange={this.handleCheckbox}
                                checked={this.state.willIGoBack}
                            />
                            <button>Submit</button>
                        </form>
                        <h3>{this.state.deleteMessage}</h3>
                    </section>
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

export default HomePage;

