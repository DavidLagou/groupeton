import React, { Component } from 'react';
import {FaBicycle } from 'react-icons/fa';
import {Link} from '@reach/router'


class Navigation extends Component {
    render() {

        const { user,logOutUser } = this.props;
        return (
            <nav className="site-nav family-sans navbar navbar-expand navbar-dark higher navColor">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand logoTxt">
                        <FaBicycle className='mr-1' /> Groupeton Rides
                     </Link>
                     
                    <div className="navbar-nav ml-auto">
                        {user && (<Link className="nav-item nav-link" to="/rides">
                            Rides
                       </Link>)
                        }
                        {!user && (<Link className="nav-item nav-link" to="/login">
                            Log in
                       </Link>)}
                        {!user && (<Link className="nav-item nav-link" to="/register">
                            Register
                       </Link>)}
                        {user && (<Link className="nav-item nav-link" to="/login" onClick={e=> logOutUser(e)}>
                            Log out
                       </Link>)}

                    </div>
                </div>
            </nav>

        )
    }
}

export default Navigation