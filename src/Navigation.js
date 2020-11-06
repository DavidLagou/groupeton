import React, { Component } from 'react';
import { FaBicycle } from 'react-icons/fa';
import { Link } from '@reach/router'


class Navigation extends Component {
    render() {

        const { user, logOutUser } = this.props;
        return (
            <nav className="site-nav family-sans navbar navbar-expand navbar-dark higher navColor">
                <div className="container-fluid">
                    <Link to="/groupeton" className="navbar-brand logoTxt">
                        <FaBicycle className='mr-1' /> Groupeton Rides
                     </Link>

                    <div className="navbar-nav ml-auto">
                        {/* statments that display depending on if the user is logged in or not. EG : if the user is logged in, show RIDES and LOGOUT only  */}
                        {user && (<Link className="nav-item nav-link" to="/groupeton/rides">
                            Rides
                        </Link>)
                        }
                        {!user && (<Link className="nav-item nav-link" to="/groupeton/login">
                            Log in
                        </Link>)}
                        {!user && (<Link className="nav-item nav-link" to="/groupeton/register">
                            Register
                        </Link>)}
                        {user && (<Link className="nav-item nav-link" to="/groupeton/login" onClick={e => logOutUser(e)}>
                            Log out
                        </Link>)}

                    </div>
                </div>
            </nav>

        )
    }
}

export default Navigation