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
import LocationDetail from "./LocationDetail"
import UsersList from "./UsersList"
class ParkingLocations extends Component {

    constructor() {
        super();


        this.state = {
            userType: null,   
            parkinglocations: []
        };
    }

    componentDidMount() {
        var obj = [];
        firebase.auth().onAuthStateChanged(() => {
            var userId = firebase.auth().currentUser.uid;
            const rootRef = firebase.database().ref();
            const speedRef = rootRef.child('users/' + userId);
            speedRef.on('value', snap => {
                var type = snap.val().type
                var userDetails = snap.val();
                this.setState({ userType: type });
                this.setState({ user: userDetails });
                console.log(this.state.user);
              
            });
            firebase.database().ref('/parkinglocations/').on('value', function (snapshot) {
                obj = snapshot.val();
                this.setState({ parkinglocations: obj });
            }.bind(this)
            );
        });
    }

    deleteParking(key) {
        console.log(key);
        firebase.database().ref('parkinglocations/' + key).remove();
    }

    

    render() {

        var parking = "";
        var btn = "";
        var key;

        if (this.state.parkinglocations !== null) {
            parking = Object.keys(this.state.parkinglocations).map((key) => {
                if (this.state.userType === 'admin') {
                    btn = <button onClick={this.deleteParking.bind(this, key)}>DELETE</button>;
                } else if (this.state.userType === 'user') {
                    btn = <Link
                        to={{
                            pathname: '/User/LocationDetail',
                            state: { keys: key }
                        }}><button>VIEW</button></Link>;
                }
                return (
                    <li>   
                        <p>LOCATION:  {this.state.parkinglocations[key].location}</p>
                        <p>  SLOTS:  {this.state.parkinglocations[key].noOfSlots}</p>

                        <p>  {btn}</p>
                    </li>
                )
            })
        }
        else {
            return (
                <li>
                    NO Parking locations AVAILABLE
        </li>

            )
        }

        return (
            <div className="containerList">
                <h1> Parking Locations </h1>
                <ul className="theList">
                    {parking}
                </ul>
            </div>
        );
    }
}
export default ParkingLocations;