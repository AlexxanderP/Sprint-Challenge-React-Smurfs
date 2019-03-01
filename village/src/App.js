import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      error: ""
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    console.log("CDM is running.");

    axios
      .get('http://localhost:3333/smurfs')
      .then(res => {
        // console.log(res);
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        // console.log(err);
        this.setState({error: err});
      });
  }

    addSmurf = (e, smurf) => {
      console.log("the addSmurf function is running")
      e.preventDefault();
      console.log(smurf);
        axios 
          .post('http://localhost:3333/smurfs', smurf)
          .then(res => {
            this.setState({
              smurfs: res.data
            });
            this.props.history.push('/');
          })
          
          .catch(err => {
            console.log(err);
          });
    };

  newMethod(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="App">
          <nav className="nav-bar">
            <h1 className="nav-header">Smurf Village</h1>
              <ul className="nav-links-container">
                <NavLink exact to="/">Smurfs</NavLink>
                <NavLink to="/smurf-form">Add Smurf</NavLink>
              </ul>
          </nav>
        <Route 
          path="/smurf-form"
          render={props => (
            <SmurfForm 
              {...props}
              addSmurf={this.addSmurf}
            />
          )}
        />

        <Route 
          exact
          path="/"
          render={props => (
            <Smurfs 
              {...props}
              smurfs={this.state.smurfs} 
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
