import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
// import Login from "./Login"
// import Signup from "./Signup"

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        };
    }




    componentDidMount() {
        // alert();

        firebase.auth().onAuthStateChanged(() => {
            var userId = firebase.auth().currentUser.uid;
            // console.log(userId);
            // var userId = "q4UQ9k63mKTPzoOmgk5mmxaxU393";
            // console.log(userId);
            const rootRef = firebase.database().ref();
            const speedRef = rootRef.child('users/' + userId);
            speedRef.on('value', snap => {

                var userName = snap.val().name
                this.setState({ user: userName })
            });
        })

    }
    signOut() {
        var flag = true;
        var userId = firebase.auth().currentUser.uid;
        // var userId = "q4UQ9k63mKTPzoOmgk5mmxaxU393";
        // console.log(user);
        if (userId) {
            // alert(userId + " is signed in");
            firebase.auth().signOut().then(function () {
                //  this.setState({ user: "" });
                alert("signOut success");

                // return flag;

                //  alert("signOut success");
                // return true;
                this.props.history.push('/Login');
            }.bind(this)).catch(function (error) {
                alert("An error happened");
            });
        } else {
            alert("No user is signed in");
            // this.props.history.push('/Signup');
            // this.props.history.push('/Login');


        }


    }






    render() {


        return (
            // <h1> {this.state.id}</h1>   
            <div>
                <h1>WELCOME TO ADMIN PANEL</h1>
                <button onClick={this.signOut.bind(this)}> SIGN OUT </button>
                <h2 className="username">{this.state.user}</h2>
                
                <p><Link to="/Admin/AddParkingLocation">Add Parking locations</Link></p>
        <p><Link to="/Admin/ParkingLocations">View Parking locations</Link></p>
        <p><Link to="/Admin/UsersList">View All users</Link></p>  
          <p><Link to="/Admin/AllBookings">View All bookings</Link></p>    
          <p><Link to="/Admin/UsersFeedback">Users Feedback</Link></p>  
            </div>
        );
    }
}

export default Admin;
