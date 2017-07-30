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

class BookSlot extends Component {

    constructor() {
        super();

        this.state = {
            key: "",
            locationName: null,
            noOfSlots: [],
            parkingslots: [],
            error: "",
            user: [],
            uid: "",
            bookings: []
        };
        this.add = this.add.bind(this);
    }
    componentDidMount() {
        var obj = [];
        var b = this;
        var i = 0;
        firebase.auth().onAuthStateChanged(() => {
            var userId = firebase.auth().currentUser.uid;
            const rootRef = firebase.database().ref();
            const speedRef = rootRef.child('users/' + userId);
            speedRef.on('value', snap => {

                obj = snap.val();
                //   console.log(obj)
                this.setState({ uid: userId });
                this.setState({ user: obj });
                var i = 0;
                var slotKey = this.props.location.state.slotKeys.toString();
                var locationName = this.props.location.state.locationName;
                var obj1 = [];
                // firebase.auth().onAuthStateChanged(() => {)
                firebase.database().ref('bookings/').orderByChild("location").equalTo(locationName).on("value", function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        if (slotKey === childSnapshot.val().slotNo) {
                            console.log('found')
                            
                            obj1[i] = childSnapshot.val();
                        }
                        i++;
                    }.bind(this))
                    // obj1 = snapshot.val();
                    console.log(obj1);
                    this.setState({ bookings: obj1 });
                    console.log(this.state.bookings);
                }.bind(this)
                );
                console.log(this.state.bookings);
            })
        });
    }

  

    add() {

        var bookingDate = this.refs.bookingDate.value;
        var bookingTime = this.refs.bookingTime.value;
        var noOfHours = this.refs.noOfHours.value;
        //         var currentDate = new Date();
        var slotKey = this.props.location.state.slotKeys;
        var locationName = this.props.location.state.locationName;

        //        var currentTime = currentDate.getTime();
        //         // var doomsday = new Date(bookingDate);
        //         // console.log(doomsday);
        //            console.log(bookingDate)
        // var a = bookingDate.split('-');
        //      console.log(a);

        //   var year=  a[0];  
        //    var month =  a[1]; 
        //     var date=  a[2]; 
        //     console.log(a[0]);
        //      console.log(a[1]);
        //       console.log(a[2]);
        //       var monthNames = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
        // console.log(month)
        //  var nameOfmonth = monthNames[Number(month-1)];
        //  console.log(nameOfmonth)
        //  console.log(nameOfmonth+" "+date+", "+year);
        //       var doomsday = new Date(nameOfmonth+" "+date+", "+year+" "+bookingTime);

        //     var userTime =  doomsday.getTime();
        //     var timeDiff =userTime - currentTime;
        //     console.log(timeDiff)
        //     // if(currentTime-userTime <0) alert("You cant book slot on past time");
        // //    console.log( doomsday.getTime());


        //   console.log(this.props.location.state.keys);
        //   console.log(this.props.location.state.parkingLocationKey);
        // console.log(key)

        if (bookingDate === '' || bookingTime === '' || noOfHours === '') {
            // alert("all fields are required");
            this.setState({ error: "** ALL FIELDS ARE REQUIRED" });
            this.refs.bookingDate.focus();
            console.log(this.state.bookings);
        }
        else {
            this.setState({ error: "" });
            var currentDate = new Date();
            currentDate.setSeconds(0);
            currentDate.setMilliseconds(0);
            var currentTime = currentDate.getTime();
            var a = bookingDate.split('-');
            var year = a[0];
            var month = a[1];
            var date = a[2];
            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            console.log(month)
            var nameOfmonth = monthNames[Number(month - 1)];
            console.log(nameOfmonth)
            console.log(nameOfmonth + " " + date + ", " + year);
            var doomsday = new Date(nameOfmonth + " " + date + ", " + year + " " + bookingTime);
            doomsday.setSeconds(0);
            doomsday.setMilliseconds(0);
            var userTime = doomsday.getTime();
            var timeDiff = userTime - currentTime;
            console.log(timeDiff);
            if (timeDiff < 0) {
                this.setState({ error: "** Cant book slot in past time" });
            }
            else {

                if (this.state.bookings === null) {
                    alert('no previous bookings');
                    var time = bookingTime.split(':');
                    var endTime = Number(time[0]) + Number(noOfHours);
                    endTime = endTime + ":" + time[1];
                    var ref = firebase.database().ref('bookings')
                    ref.push({
                        location: locationName,
                        slotNo: slotKey.toString(),
                        uid: this.state.uid,
                        uName: this.state.user.FName,
                        date: bookingDate,
                        startTime: bookingTime,
                        endTime: endTime,
                        hours: noOfHours,
                    });
                    this.setState({ error: "** Book successfully" });
                } else {

                    var time = bookingTime.split(':');
                    var endTime = Number(time[0]) + Number(noOfHours);
                    endTime = endTime + ":" + time[1];
                    console.log(this.state.bookings);
                    var keys = Object.keys(this.state.bookings);
                    var key = this.state.bookings;


                    var flag = 0;
                    for (var i in key) {

                        if (bookingDate === this.state.bookings[i].date && ((this.state.bookings[i].startTime === bookingTime && this.state.bookings[i].endTime === endTime) || (bookingTime >= this.state.bookings[i].startTime && !(bookingTime >= this.state.bookings[i].endTime)) || (bookingTime < this.state.bookings[i].startTime && endTime > this.state.bookings[i].startTime))) {
                            this.setState({ error: "** Already  booked" });
                            flag = 1;
                        }
                    }
                    if (flag === 0) {
                        var time = bookingTime.split(':');
                        var endTime = Number(time[0]) + Number(noOfHours);
                        endTime = endTime + ":" + time[1];
                        var ref = firebase.database().ref('bookings');
                        ref.push({
                            location: locationName,
                            slotNo: slotKey.toString(),
                            uid: this.state.uid,
                            uName: this.state.user.FName,
                            date: bookingDate,
                            startTime: bookingTime,
                            endTime: endTime,
                            hours: noOfHours,
                        });
                        this.setState({ error: "** Book successfully" });

                    }

                }
            }
            
        }
    }


    render() {
        return (
            <div className="containerList">
                <h1> Location Name: {this.props.location.state.locationName}</h1>
                <h1> Book parking Slot {this.props.location.state.slotKeys}</h1>
                <span id="error">{this.state.error}</span ><br />
                <input type="date" ref="bookingDate" /><br />
                <input type="time" ref="bookingTime" /><br />
                <input type="number" min="1" ref="noOfHours" placeholder="Hours" /><br /><br />
                <button onClick={this.add.bind(this)}> ADD   </button>
            </div>
        );
    }
}
export default BookSlot;