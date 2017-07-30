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

class MyFeedbacks extends Component {

    constructor() {
        super();


        this.state = {
         
            feedbacks: []
        };
    }

    componentDidMount() {
        var obj = [];

        firebase.auth().onAuthStateChanged(() => {
            var userId = firebase.auth().currentUser.uid;

            var i = 0;
            firebase.database().ref('/feedbacks/').orderByChild("uid").equalTo(userId).on("value", function (snapshot) {
                obj = snapshot.val();
                console.log(obj);
                this.setState({ feedbacks: obj });
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
                btn = <button onClick={this.deleteFeedback.bind(this, key)}>DELETE FEEDBACK</button>;
                return (
                    <li className="view">


                        <p>TTILE:  {this.state.feedbacks[key].title}</p>
                        <p>  DESCRIPTION:  {this.state.feedbacks[key].desc}</p>

                        <p>  {btn}</p>
                    </li>
                )
            })
        }
        else {
            return (


                <div>
                    NO FEEDBACKS AVAILABLE
        </div>

            )
        }


        return (
            <div className="containerList">
                <h1> My feedbacks
             </h1>
                <ul>  {feedbacks} </ul>

            </div>
        );
    }
}
export default MyFeedbacks;