import React, { Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
//import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import HomeUnanswered from './HomeUnanswered'
import HomeAnswered from './HomeAnswered'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import SignIn from './SignIn'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
        {/*<LoadingBar>*/}
        
        <div className="container">
          <Nav />
          <div align='center'>
             <Redirect from="/" to="/unanswered" />
             {this.props.loading === true
              ? null
              : <Route path={["/home", "/unanswered", "/"]} exact component={HomeUnanswered} />
              }
              
              <Route path='/answered' exact component={HomeAnswered} />
              <Route path='/newquestion' component={NewQuestion} />
              <Route path='/leaderboard' component={LeaderBoard} />
              <Route path='/signin' component={SignIn} />
            </div>
        </div>
        </Fragment>
      </Router>
    )

  }
  
}


function mapStateToProps({authedUser}) {
  return {
    loading: authedUser===null
  }
}

export default connect(mapStateToProps)(App);
