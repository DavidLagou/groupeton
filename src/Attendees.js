import React, { Component } from 'react';
import firebase from './Firebase';
import AttendeesList from './AttendeesList'
import { navigate } from '@reach/router';

import { FaUndo, FaCalendarCheck, FaClock, FaBicycle, FaPlusCircle } from 'react-icons/fa'


class Attendees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            displayAttendees: [],
            displayGroupetonInfo: []

        }
        this.handleChange = this.handleChange.bind(this);
        this.resetQuery = this.resetQuery.bind(this);
    }

    componentDidMount() {
        // Grabs a list of all attendies and displays them 
        const ref = firebase
            .database()
            .ref(`rides/${this.props.userID}/${this.props.rideID}/attendees`);
        ref.on('value', snapshot => {
            let attendees = snapshot.val();
            let attendeesList = [];
            for (let item in attendees) {
                attendeesList.push({
                    attendeeID: item,
                    attendeeName: attendees[item].attendeeName,
                    attendeeEmail: attendees[item].attendeeEmail
                });
            }
            this.setState({
                displayAttendees: attendeesList
            });
        });


        const groupetonInfo = firebase
            .database()
            .ref(`rides/${this.props.userID}/${this.props.rideID}`);
        groupetonInfo.on('value', snapshot => {
            let rideInfo = snapshot.val();
            this.setState({
                displayGroupetonInfo: rideInfo
            })
        })
    };

    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;
        this.setState({
            [itemName]: itemValue
        });
    }
    resetQuery() {
        this.setState({
            searchQuery: ''
        });
    }
  

    render() {
    
        const dataFilter = item => item.attendeeName.toLowerCase().match(this.state.searchQuery.toLocaleLowerCase()) && true;
        const filteredAttendees = this.state.displayAttendees.filter(dataFilter);
        

        return (
            <div>
                <div className="jumbotron rideJumbo">
                    <h1 className="display-4 attendeeTitle">{this.state.displayGroupetonInfo.groupetonName} <FaBicycle /> </h1>

                    <p className="lead attendeeDesc" > {this.state.displayGroupetonInfo.groupetonDesc}</p>
                    <div className="timeContainer" >

                        <p className="rideCalender"> <FaCalendarCheck /> {this.state.displayGroupetonInfo.groupetonDate}</p>
                        <p className="rideTime"> <FaClock /> {this.state.displayGroupetonInfo.groupetonTime}</p>

                    </div>
                    <div>
                            <button  className='checkBtn' onClick={e => navigate(`/checkin/${this.props.userID}/${this.props.rideID}`)}>
                               <FaPlusCircle/> Check in
                             </button>
                        </div>


                </div>
                <div className="container">
                    <div className="row justify-content-center searchContainer">
                        <div className="col-md-8 ">
                            <h1 className="text-center" >
                                Attendees
                            </h1>
                            <div className="card  mb-2 mt-6 searchBar">
                                <div className="card-body text-center">
                                    <div className="input-group input-group-md ">
                                        <input
                                            type="text"
                                            name="searchQuery"
                                            placeholder="Search Riders"
                                            className="form-control"
                                            value={this.state.searchQuery}
                                            onChange={this.handleChange} />

                                        <div className="input-group-append">
                                            <button
                                                className="btn btn-sm resetQuery"
                                                title="reset Search"
                                                onClick={this.resetQuery}
                                            >
                                                <FaUndo />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <AttendeesList
                        adminUser={this.props.adminUser}
                        userID={this.props.userID}
                        attendees={filteredAttendees}
                        rideID={this.props.rideID}

                    />
                </div>

            </div>
        )
    }
}

export default Attendees