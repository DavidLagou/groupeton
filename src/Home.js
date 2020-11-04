import React, { Component } from 'react';
import { Link } from '@reach/router'


class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="text-center homebgtwo">
       

        <div className="row justify-content-center homeContainer">
          <div className="col-10 col-md-10 col-lg-8 col-xl-7 contentContainer">
            <div className="display-4 mt-3 mb-2 titleTxt">
              Groupeton Ride Schedual
                  </div>
            <p className="lead">
              Groupeton allows users to schedual any upcoming rides in one place. Simply create a groupeton and add friends to your ride.
              </p>

            {/* Conditional statement that shows things that depends if there is a value for user */}
            {user == null && (
              <span>
                <Link to="/register" className="btn btn-outline-primary mr-2 homeBtn"> Register </Link>
                <Link to="/login" className="btn btn-outline-primary mr-2 homeBtn ">Log In</Link>
              </span>
            )}

            {user && (
              <Link to="groupeton/rides" className="btn btn-primary homeBtn"> My Rides   </Link>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Home