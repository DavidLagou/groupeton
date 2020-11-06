// Import React
import React, { Component } from 'react';
import { navigate, Router } from '@reach/router';
import firebase from './Firebase';

import Home from './Home';
import Navigation from './Navigation';
import Login from './Login';
import Rides from './Rides';
import Register from './Register';
import Checkin from './Checkin'
import Attendees from './Attendees';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null,
    };
  }


  componentDidMount() {

    firebase.auth().onAuthStateChanged(FBUser => {

      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        // Grabbing every ride object in the database and storing it into an array 
        const ridesRef = firebase.database().ref('rides/' + FBUser.uid);
        ridesRef.on('value', snapshot => {
          let rides = snapshot.val();
          let ridesList = [];

          for (let item in rides) {
            ridesList.push({
              rideID: item,
              rideName: rides[item].groupetonName,
              rideDate: rides[item].groupetonDate,
              rideTime: rides[item].groupetonTime,
              rideDesc: rides[item].groupetonDesc,
              rideLocation: rides[item].groupetonLocation,


            });
          }
          this.setState({
            rides: ridesList,
            howManyRides: ridesList.length
          })
        })


      } else {
        this.setState({ user: null, displayName: null });
      }

    });

  }

  // Registering a new user and navigating them into rides page. 
  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate('/groupeton/rides');
      });
    });
  };

  // Logging out user and setting all of the global states as null 
  logOutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });

    // Signing out the user and navigating them to the login page 
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate('/groupeton/login');
      });
  };

  // Adding a object into the at the path that matches the user ID database and storing the values from our object inside of it
  addGroupeton = tempGroupeton => {
    const ref = firebase
      .database()
      .ref(`rides/${this.state.user.uid}`);
    ref.push(
      {
        groupetonName: tempGroupeton.groupetonName,
        groupetonDate: tempGroupeton.groupetonDate,
        groupetonTime: tempGroupeton.groupetonTime,
        groupetonDesc: tempGroupeton.groupetonDesc,
        groupetonLocation: tempGroupeton.groupetonLocation,

      }
    )
  }

  render() {
    return (
      <div>
        <Navigation user={this.state.user} logOutUser={this.logOutUser} />

        <Router>
          
          <Home path="/groupeton" user={this.state.user} />
          <Login path="/groupeton/login" />

          <Attendees
            path="/attendees/:userID/:rideID"
            adminUser={this.state.userID}
            rides={this.state.rides}
          />
          <Rides
            path="/groupeton/rides"
            rides={this.state.rides}
            addGroupeton={this.addGroupeton}
            userID={this.state.userID}
          />
          <Checkin
            path="/checkin/:userID/:rideID"
            rides={this.state.rides}
            addGroupeton={this.addGroupeton}
            userID={this.state.userID}
          />
          <Register path="/groupeton/register" registerUser={this.registerUser} />
        </Router>

      </div>
    );
  }
}

export default App;
