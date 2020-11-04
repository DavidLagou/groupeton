import React, { Component } from 'react';
import { GoTrashcan } from 'react-icons/go';
import { FaLink } from 'react-icons/fa';

import firebase from './Firebase'
import { navigate } from '@reach/router';


class RideList extends Component {
    constructor(props) {
        super(props);
        this.deleteRide = this.deleteRide.bind(this)
    }
    // Removes obj from database
    deleteRide = (e, whichRide) => {
        e.preventDefault();
        const ref = firebase.database().ref(`rides/${this.props.userID}/${whichRide}`);
        ref.remove();
    }

    render() {
        const { rides } = this.props;
        const myRides = rides.map(item => {
            return (
                <div className="col-sm-6" key={item.rideID}>
                    <div className="card singleRide" >
                        <div className="card-body">
                            <h5 className="card-title">{item.rideName}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{item.rideDate} @ {item.rideTime}</h6>
                            <p className="card-text rideDesc">{item.rideDesc}</p>


                            <button className="btn btn-sm btn-outline-secondary"
                                title="Check in"
                                onClick={e => navigate(`/checkin/${this.props.userID}/${item.rideID}`)}
                            >
                                <FaLink />

                            </button>

                            <button className="btn btn-sm btn-outline-secondary"
                                title="Delete"
                                onClick={e => { this.deleteRide(e, item.rideID) }} >
                                <GoTrashcan />
                            </button>
                            <button className="btn btn-primary float-right formBtn"
                                title="Attendees List"
                                onClick={e => navigate(`/attendees/${this.props.userID}/${item.rideID}`)}
                            >
                                View Details

                            </button>
                        </div>
                    </div>
                </div>

            )
        }

        )
        return (
            <div className="row rideListContainer ">
                {myRides}
            </div>
        )
    }
}

export default RideList
