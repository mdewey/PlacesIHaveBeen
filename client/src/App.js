import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from "./Components/HomePage.jsx";
import Callback from "./Components/Callback";


import Auth from './Auth/Auth';
import history from './Auth/History';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {
 render() {
   return (
    <Router history={history} >
       <Switch>
         <Route path="/" exact component={HomePage}/>
         <Route path="/Home" exact component={HomePage}/>
         <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>
       </Switch>
     </Router>
   )
 }
}

export default App;
