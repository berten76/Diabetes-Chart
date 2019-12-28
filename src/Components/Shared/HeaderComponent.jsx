import React, {Component} from 'react'
//import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import { Link} from 'react-router-dom'
import AuthenticationService from '../Authentification/AuthenticationService.js';
import { withRouter } from 'react-router';

class HeaderComponent extends Component {

    render() {
        let loggedin = AuthenticationService.isUserLoggedIn();
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a className="navbar-brand">Diabetes chart</a></div>
                    <ul className="navbar-nav">
                        {loggedin && <li><Link to="/livedata"  className="nav-link">Live data</Link></li>} 
                        {loggedin && <li><Link to="/reports"  className="nav-link">Reports</Link></li>}
                        {loggedin && <li><Link to="/parameters"  className="nav-link">Parameters</Link></li>}
                        {loggedin && <li><Link to="/settings"  className="nav-link">Settings</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!loggedin && <li><Link to="/login"  className="nav-link">Login </Link></li>}
                        {loggedin && <li><Link to="/logOut" onClick={AuthenticationService.logout}  className="nav-link">Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent);