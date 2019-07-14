import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'


class SignOut extends Component {
    constructor(props) {
        super(props);
        this.state = {auth: this.props.authedUser};

        if (this.props.authedUser !== '') {
            this.props.dispatch(setAuthedUser(''));  
            this.props.history.push("/signin");
        }
        
      }

    render() {

        return (
            <Redirect to='/signin' />
        )
    }
}


function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(SignOut);





