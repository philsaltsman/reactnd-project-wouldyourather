import React, { Component, Fragment} from 'react';
//import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import Loading from './Loading'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import AppRouter from './AppRouter'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: this.props.loading};
  }

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Fragment>
        
        <LoadingBar className='loadingBar' />
          {this.props.loading === true
            ? <Loading />
            : <Fragment><div className="container"><AppRouter /></div></Fragment>
            }
        
      
      </Fragment>
    )

  }
  
}


function mapStateToProps({authedUser}) {
  
  return {
    loading: authedUser===null
  }
}

export default connect(mapStateToProps)(App);
