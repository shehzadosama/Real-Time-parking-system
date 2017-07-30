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

class LocationDetail extends Component {

    constructor() {
        super();


        this.state = {

            locationName: null,
            noOfSlots: [],
            parkingslots: []
        };
    }

    componentDidMount() {
        var key = this.props.location.state.keys;
        // console.log(recievedMessage)
        var obj;
        var obj1;
        firebase.auth().onAuthStateChanged(() => {

            firebase.database().ref('/parkinglocations/' + key).on('value', function (snapshot) {

                this.setState({ locationName: snapshot.val().location });
                this.setState({ noOfSlots: snapshot.val().noOfSlots });


            }.bind(this)
            );
            firebase.database().ref('/parkinglocations/' + key + '/SlotsData/').on('value', function (snapshot) {

                obj = snapshot.val();
                console.log(obj);
                this.setState({ parkingslots: obj });


                console.log(this.state.parkingslots)
            }.bind(this)
            );
        })
    }

    //     deleteParking(key) {
    //         console.log(key);
    //         firebase.database().ref('parkinglocations/' + key).remove();
    //     }

    applyParkingSlot(key) {
        console.log(key);
        alert("Sucessfully applied for parking");
    }



    render() {

        var parking = "";
        var btn = "";
        var key;

        // if (this.state.parkingslots !== null) {



        parking = Object.keys(this.state.parkingslots).map((key) => {
            // var button = <button onClick={this.applyParkingSlot.bind(this, key)}> {this.state.parkingslots[key].slotName}</button>
            var button = <button><Link
                to={{
                    pathname: '/User/LocationDetail/BookSlot',
                    state: {
                        slotKeys: key,
                        locationName: this.state.locationName
                        // parkingLocationKey: this.props.location.state.keys
                    }
                }}>{this.state.parkingslots[key].slotName}</Link></button>;
            if (this.state.userType === 'admin') {
                btn = <button onClick={this.deleteParking.bind(this, key)}>DELETE</button>;
            } else if (this.state.userType === 'user') {
                btn = <button onClick={this.applyParking.bind(this, key)}>VIEW</button>;
            }

            return (
                <div className="view">


                    {/* <p>  status:  {this.state.parkingslots[key].status}</p>  */}

                    <p>  {button}</p>
                    {/* <button className="apply" onClick={this.deleteCompany.bind(this, key)}>Remove</button> */}
                </div>
            )
        })
        // }
        // else {
        //     return (


        //         <li>
        //             NO Parking locations AVAILABLE
        // </li>

        //     )
        // }

        //  function createTasks(item) {
        //   return <div><li>NAME:  {item.name} <br />
        //   Email: {item.email} <br />
        //   Education: {item.education} <br />
        //   GPA: {item.education} <br />
        // Overview: {item.overview} <br />
        //    </li><br /> 

        //   </div>
        // // onClick ={this.viewData.bind(this)}
        // }
        //  var jobList = this.state.students.map(createTasks);

        return (
            <div className="containerList">
                <h1> Location details </h1>
                <p>Location Name: {this.state.locationName}</p>
                <p>No of slots:  {this.state.noOfSlots}</p>
                {/* <ul className="theList"> */}
                {parking}
                {/* </ul>    */}
            </div>
        );
    }
}
export default LocationDetail;