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

class SendFeedbacks extends Component {

    constructor() {
        super();


        this.state = {
            error: ""

        };
    }




    btnSubmit() {
        var username;
        var userId;
        const title = this.refs.title.value;
        const desc = this.refs.desc.value;
        if (title === '' || desc === '') {
            this.setState({ error: "** ALL FIELDS ARE REQUIRED" });
            this.refs.title.focus();
            //  alert("all fields are required");
        } else {
            this.setState({ error: "" });
            var userId = firebase.auth().currentUser.uid;
            const rootRef = firebase.database().ref();
            const speedRef = rootRef.child('users/' + userId);
            speedRef.on('value', snap => {
                username = snap.val().FName;
                // console.log(username);
            });
            var feedback = {
                title: title,
                desc: desc,
                uid: userId,
                userName: username
            };
            console.log(feedback);
            var ref = firebase.database().ref('feedbacks')
            ref.push(
                feedback
            );
            alert("Feedback submitted");
        }
    }

    render() {
        return (
            <div className="containerList">

                <h1> SEND FEEDBACKS </h1>
                <span id="error">{this.state.error}</span >
                <input className="location" type="text" ref="title" placeholder="Title" />  <br />
                <textarea className="slots" ref="desc" placeholder="Description" /><br /> <br />
                <button ref="btnSubmit" onClick={this.btnSubmit.bind(this)}>SUBMIT FEEDBACK</button>

            </div>
        );
    }
}
export default SendFeedbacks;