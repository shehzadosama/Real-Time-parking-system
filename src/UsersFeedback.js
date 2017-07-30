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

class UsersFeedbacks extends Component {

    constructor() {
        super();


        this.state = {
            userType: null,
            name: null,
            feedbacks: []
        };
    }

    componentDidMount() {
var obj = [];

    firebase.auth().onAuthStateChanged(() => {
      var userId = firebase.auth().currentUser.uid;

      var i = 0;
      firebase.database().ref('/feedbacks/').on("value", function (snapshot) {
        // snapshot.key();
        //  var exists = false;  
        obj = snapshot.val();
        // snapshot.forEach(function (childSnapshot) {
        //   // if(userId === childSnapshot.val().uid){
        //   // alert(childSnapshot.val().desc);
        //   // alert(childSnapshot.val().salary);
        //   //  alert(childSnapshot.val().title);
        //   obj[i] = childSnapshot.val();


        //   // obj='ssss'
        //   // alert();

        //   //  console.log(this.state.job)
        //   // }
        //   i++;

        // })
        // this.a(obj);
        console.log(obj);
        this.setState({ feedbacks: obj });
        //  this.setState({ job: obj} );
        // console.log(this.state.job)
      }.bind(this)
      );
    });
  }







    deleteFeedback(key) {
        console.log(key);
        firebase.database().ref('feedbacks/' + key).remove();
    }



    render() {

        var feedbacks = "";
        var btn = "";
        var key;

        if (this.state.feedbacks !== null) {
            feedbacks = Object.keys(this.state.feedbacks).map((key) => {
                // if (this.state.userType === 'admin') {
                    btn = <button onClick={this.deleteFeedback.bind(this, key)}>DELETE FEEDBACK</button>;
                // }
                return (
                    <li >

                     
                        <p>TTILE:  {this.state.feedbacks[key].title}</p>
                        <p>  DESCRIPTION:  {this.state.feedbacks[key].desc}</p>
                       <p>  User Name:  {this.state.feedbacks[key].userName}</p>
                        <p>  {btn}</p>
                        {/* <button className="apply" onClick={this.deleteCompany.bind(this, key)}>Remove</button> */}
                    </li>
                )
            })
        }
        else {
            return (


                <li>
                    NO FEEDBACKS AVAILABLE
        </li>

            )
        }


        return (
            <div className="containerList">

          <ul>  {feedbacks} </ul>

            </div>
        );
    }
}
export default  UsersFeedbacks;