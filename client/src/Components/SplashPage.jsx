import React, { Component } from 'react';
import Auth from '../Auth/Auth';
import Logo from './Images/logo_transparent.png'

const auth = new Auth();

class SplashPage extends Component {

    login = () => {
        auth.login();
    }

    render() {
        return (
            <div className="splash-app">
                <img className="main-logo" src={Logo} alt="fireSpot" />
                <button onClick={this.login} >Get Started</button>
            </div>
        );
    }
}

export default SplashPage;
