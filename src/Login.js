import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      error: null
    };

  }



  login() {

    var email = "";
    var password = "";
    email = this.refs.txtEmail.value;
    password = this.refs.txtPassword.value;
    var userId = ""
    var userType;
    if (email === '' || password === '') {
      // alert("all fields are required");
      this.setState({ error: "** ALL FIELDS ARE REQUIRED" });
      this.refs.txtEmail.focus();
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
        // console.log(res);
        var userId = firebase.auth().currentUser.uid;
        const rootRef = firebase.database().ref();
        const speedRef = rootRef.child('users/' + userId);
        speedRef.on('value', snap => {

          userType = snap.val().type

          //  alert(userType);
          if (userType === 'user') {
            this.props.history.push('/User');
          } else if (userType === 'admin') {
            this.props.history.push('/Admin');
          }
        });

      }
      ).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          // alert("Wrong password.'");
          this.setState({ error: "Wrong password." });
        } else if (errorMessage) {
          // alert(errorMessage);
          this.setState({ error: errorMessage });

        }
      }.bind(this));

    }

  }

  render() {
    return (
      <div className="container">

        <h1 >LOGIN FORM </h1>
        <span id="error">{this.state.error}</span >
        <input className="txtEmail" type="email" ref="txtEmail" placeholder="Email" />  <br />
        <input className="txtPassword" type="password" ref="txtPassword" placeholder="Password" /><br /> <br />
        <button ref="btnLogin" onClick={this.login.bind(this)}>LOGIN</button>
        Not Already a User ? <Link to="/signup">SIGN UP NOW</Link><br /> <br />
      </div>
    );
  }
}
export default Login;
