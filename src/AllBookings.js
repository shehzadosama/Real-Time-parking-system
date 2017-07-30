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

class AllBookings extends Component {

    constructor() {
        super();


        this.state = {
            userType: null,
            name: null,
            bookings: []
        };
    }

    componentDidMount() {
        var obj = [];
        firebase.auth().onAuthStateChanged(() => {
            var userId = firebase.auth().currentUser.uid;
            //   // console.log(userId);
            // var userId = "TQWfTYxcPKVtaBWQcT31LmcBq0g2";
            const rootRef = firebase.database().ref();
            const speedRef = rootRef.child('users/' + userId);
            speedRef.on('value', snap => {

                var type = snap.val().type
                // var userObj = snap.val();
                // console.log(userObj)
                this.setState({ userType: type });
                //  this.setState({name: username});
                // console.log(this.state.userType);
                // this.refs.name.value= this.user.name; 
            });

            var i = 0;
            firebase.database().ref('/bookings/').on("value", function (snapshot) {
                obj = snapshot.val();
                //  var exists = false;
                // snapshot.forEach(function (childSnapshot) {
                //   // if ('com' === childSnapshot.val().type) {
                //     // alert(childSnapshot.val().desc);
                //     // alert(childSnapshot.val().salary);
                //     //  alert(childSnapshot.val().title);
                //     obj[i] = childSnapshot.val();     
                //   // }
                //   i++;

                // })

                this.setState({ bookings: obj });
                //  this.setState({ job: obj} );
                // console.log(this.state.companies)
            }.bind(this)
            );
        });
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
               
                    btn = <button onClick={this.deleteBooking.bind(this, key)}>DELETE</button>;
                
                return (
                    <li className="view">

                         <p>Location Name:  {this.state.bookings[key].location}</p>
                        <p>  Slot:  {this.state.bookings[key].slotNo}</p>
                        <p>   Date:  {this.state.bookings[key].date}</p>
                        <p> Time:  {this.state.bookings[key].startTime}</p>
                        <p>Hours: {this.state.bookings[key].hours}</p>
                         <p>User Name: {this.state.bookings[key].uName}</p>
                        <p>  {btn}</p>
                    </li>
                )
            })
        }
        else {
            return (


                <li>
                    NO bookings AVAILABLE
        </li>

            )
        }



        return (
            <div className="containerList">

                <h1> All bookings
             </h1>
  <ul>{bookings}</ul>

            </div>
        );
    }
}
export default AllBookings;