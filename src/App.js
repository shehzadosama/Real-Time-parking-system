import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Login from "./Login"
import Signup from "./Signup"
import Admin from "./Admin"
import User from "./User"
import MyBookings from "./MyBookings"
import ParkingLocations from "./ParkingLocations"
import SendFeedbacks from "./SendFeedbacks"
import MyFeedbacks from "./MyFeedbacks"
import AddParkingLocation from "./AddParkingLocation"
import AllBookings from "./AllBookings"
import UsersFeedback from "./UsersFeedback"
import UsersList from "./UsersList"
import LocationDetail from "./LocationDetail"
import BookSlot from "./BookSlot"
import './style.css';
class App extends Component {
  render() {
    return (
      <div >
        <Router>
          <div >

            <Route exact path="/" component={Login} />
            <Route path="/Login" component={Login} />
            <Route path="/Signup" component={Signup} />
            <Route path="/User" component={User} />
            <Route path="/User/MyBookings" component={MyBookings} />
            <Route path="/User/ParkingLocations" component={ParkingLocations} />
            <Route path="/User/SendFeedbacks" component={SendFeedbacks} />
            <Route path="/User/MyFeedbacks" component={MyFeedbacks} />
            <Route path="/User/LocationDetail" component={LocationDetail} />
            <Route path="/User/LocationDetail/BookSlot" component={BookSlot} />
            <Route path="/User/BookSlot" component={BookSlot} />
            <Route path="/Admin" component={Admin} />
            <Route path="/Admin/AddParkingLocation" component={AddParkingLocation} />
            <Route path="/Admin/AllBookings" component={AllBookings} />
            <Route path="/Admin/UsersFeedback" component={UsersFeedback} />
            <Route path="/Admin/UsersList" component={UsersList} />
            <Route path="/Admin/ParkingLocations" component={ParkingLocations} />



          </div>

        </Router>
      </div>
    );
  }
}

export default App;
