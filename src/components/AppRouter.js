import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import Answered from './Answered'
import Nav from './Nav'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Questions from './Questions'
import SignIn from './SignIn'
import SignOut from './SignOut'
import AccountProfile from './AccountProfile'
import Welcome from './Welcome'
import { isVarUndefined } from '../functions/isVarUndefined';


class AppRouter extends Component {
    

    constructor(props) {
        super(props);
        this.state = {auth: this.props.authedUser};
        
      }


      signedIn = () => {
        
        if (isVarUndefined(this.props.authedUser)) {
            return (
                <Fragment>
                    <Route path={["/*"]} component={Welcome} />
                    <Route path={["/signin"]} component={SignIn} />
                </Fragment>
           )
        } else {
            return (
                <Fragment>
                    <Route exact path={["/"]} component={Home} />
                    <Route exact path={["/answered"]} component={Answered} />
                    <Route exact path={["/questions/:id"]} component={Questions} />
                    <Route exact path={["/add"]} component={NewQuestion} />
                    <Route exact path={["/leaderboard"]} component={LeaderBoard} />
                    <Route exact path={["/signin"]} component={SignIn} />
                    <Route exact path={["/signout"]} component={SignOut} />
                    <Route exact path={["/profile"]} component={AccountProfile} />
                </Fragment>
            )
        }

      }

    render() {



        return (
            <Fragment>
                <Router>
                <div className='headingbkg' />
                <div className='heading'>
                    <div className='headinginner'>
                        <Link className='aheading' to='/'><b><i>Would You Rather</i></b></Link>
                    </div>
                    
                </div>
                <div className='social'>
                        <a className='asocial' href="http://philsaltsman.com">philsaltsman</a>
                        <a href="https://github.com/philsaltsman">
                            <img className='inverted' height="25px" width="auto" src="https://cdn.afterdawn.fi/v3/news/original/github-logo.png" alt="link to github/philsaltsman" />
                        </a>
                </div>
                <br />
                
                    <Nav />
                    <div align='center'>
                        {this.signedIn()}
                    </div>                    
                </Router>
            </Fragment>
        )


    }
}

function mapStateToProps({authedUser,users}) {
    return {
        userIds: Object.keys(users),
        user: users,
        authedUser
    }
}

export default connect(mapStateToProps)(AppRouter);