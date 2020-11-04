import React, { Component } from 'react';
import { GoMail, GoTrashcan } from 'react-icons/go';
import firebase from './Firebase';


class AttendeeList extends Component {
    constructor(props) {
        super(props);
        this.deleteAttendee = this.deleteAttendee.bind(this)
    }

    // Deletes attendee based on the selected ride ID and the selected attendee 
    deleteAttendee = (e, whichRide, whichAttendee) => {
        e.preventDefault();
        const adminUser = this.props.adminUser;
        const ref = firebase.database()
            .ref(`rides/${adminUser}/${whichRide}/attendees/${whichAttendee}`);
        ref.remove();
    }
    render() {
        
        // Checks to see if the curr usedID is the admin, this is important because there are sometimes that we want to display only if the curr user is the admin of the specific groupeton 
        const admin = this.props.adminUser === this.props.userID ? true : false;

        const attendees = this.props.attendees;
        const myAttendees = attendees.map(item => {
            return (
                <div className="col-sm-6 " key={item.attendeeID}>
                    <div className="card ridersCard">
                        <div
                            className={
                                'card-body px-3 py-2  align-items-center ' +
                                (admin ? '' : 'justify-content-center')}>

                            <div>{item.attendeeName}</div>
                            {/* If the curr user is the admin then we will display a delete button and an email button  */}
                            {admin && (
                                <div className="align-items-center float-right">
                                    <button
                                        className="btn btn-sm deleteBtn"
                                        title="Delete Attendee"
                                        onClick={e => this.deleteAttendee(e, this.props.rideID, item.attendeeID)}
                                    >
                                        <GoTrashcan />
                                    </button>
                                    <a href={`mailto:${item.attendeeEmail}`} className="btn btn-sm btn-outline-secondary emailBtn" title='Mail Attendee'> <GoMail /> </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="row justify-content-center ridersContainer"> {myAttendees}</div>
        )
    }
}

export default AttendeeList

