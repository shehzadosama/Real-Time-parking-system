import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Login from "./Login"
import Signup from "./Signup"

class MyBookings extends Component {

    constructor() {
        super();


        this.state = {
            bookings: []
        };
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged(() => {
            var userId = firebase.auth().currentUser.uid;
            var obj = [];
            var i = 0;
            firebase.database().ref('/bookings/').orderByChild("uid").equalTo(userId).on("value", function (snapshot) {
                obj = snapshot.val();
                this.setState({ bookings: obj });
                console.log(this.state.bookings);
            }.bind(this)
            );
        })
    }




    deleteBooking(key) {
        console.log(key);
        firebase.database().ref('bookings/' + key).remove();
    }



    render() {
       
        var bookings = "";
        var btn = "";
        var key;

        if (this.state.bookings !== null) {
            bookings = Object.keys(this.state.bookings).map((key) => {

                btn = <button onClick={this.deleteBooking.bind(this, key)}>DELETE BOOKING</button>;

                return (
                    <li className="view">
                        <p>Location Name:  {this.state.bookings[key].location}</p>
                        <p>  Slot:  {this.state.bookings[key].slotNo}</p>
                        <p>   Date:  {this.state.bookings[key].date}</p>
                        <p> Time:  {this.state.bookings[key].startTime}</p>
                        <p>Hours: {this.state.bookings[key].hours}</p>
                        <p>  {btn}</p>
                    </li>
                )
            })
        }
        else {
            return (
                <div>
                    NO bookings AVAILABLE
        </div>
            )
        }



        return (
            <div className="containerList">

                <h1> My bookings
             </h1>
                <ul>{bookings}</ul>

            </div>
        );
    }
}
export default MyBookings;