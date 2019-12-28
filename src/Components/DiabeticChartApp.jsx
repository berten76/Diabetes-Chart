import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import AuthenticatedRoute from './Authentification/AuthenticatedRoute';
import LoginComponent from './Authentification/LoginComponent';
import LogoutComponent from './Authentification/LogoutComponent';
import LiveData from './LiveData/LiveData';
import Reports from './Reports/Reports';
import HeaderComponent from './Shared/HeaderComponent';
import FooterComponent from './Shared/FooterComponent';
class DiabeticChartApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                    <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/LiveData" component={LiveData}/>
                            <AuthenticatedRoute path="/Reports" component={Reports}/>
                            <Route path="/logout" component={LogoutComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                        <FooterComponent />
                    </>
                </Router>

                {/*<LoginComponent/>
                <WelcomeComponent/>*/}
            </div>
        )
    }
}
function ErrorComponent() {
    return <div>An Error Occurred. I don't know what to do! Contact support at abcd-efgh-ijkl</div>
}

export default DiabeticChartApp;