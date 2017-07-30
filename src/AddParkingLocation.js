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

class AddParkingLocation extends Component {

    constructor() {
        super();


        this.state = {
            userType: null,
            name: null,
            students: [],
            error: ""
        };
    }







    add() {

        var location = this.refs.location.value;
        var slots = this.refs.slots.value;
        var userId = ""
        var userType;
        var slotsData= [];
        if (location === '' || slots === '') {
            // alert("all fields are required");
            this.setState({ error: "** ALL FIELDS ARE REQUIRED" });
            this.refs.location.focus();
        }
        else {
            var parkingData = {
                location: location,
                slots: slots,
            };

            for(var i=0;i<slots;i++){
slotsData.push({
    status :'not booked',
        slotName: 'Slot No '+i
})

            }

            // this.setState({  job: parkingData}),
            // function() {
            //   var applications ="";
            // console.log( this.state.jobData);
            // console.log( this.state.job);
            // do something with new state
            var ref = firebase.database().ref('parkinglocations')
            var key = ref.push({
                    location: location,
                    noOfSlots:  slots
               
            }
            );


           

            alert("parking location added successfully");
            this.setState({ error: "" });
        }

    }

    render() {
        return (
            <div className="containerList">

                <h1> Add parking locations  </h1>
                <span id="error">{this.state.error}</span >
                <input className="location" type="text" ref="location" placeholder="Location" />  <br />
                <input className="slots" type="number" min="1" ref="slots" placeholder="No of slots" /><br /> <br />
                <button ref="btnLogin" onClick={this.add.bind(this)}>ADD</button>


            </div>
        );
    }
}
export default AddParkingLocation;