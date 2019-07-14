import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import Avatar from './Avatar'
import { isVarUndefined } from '../functions/isVarUndefined';
import { NavLink } from 'react-router-dom';

class AccountProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {auth: this.props.authedUser};
        
        this.handleChange = this.handleChange.bind(this);
      }

  
      handleChange() {
        this.props.history.push("/signin");
        this.props.dispatch(setAuthedUser(''));     
        
      }



    render() {


      if (isVarUndefined(this.props.authedUser)) {
        return (
          <Fragment>
            <div>
            <h3>Sorry</h3><br /><br />
            You must <NavLink to='/signin' activeClassName='active'>Sign in</NavLink> to view this content
            </div>
          </Fragment>
        )
      } else {
        return (
          <Fragment>
            <div>
              <h3>Your account</h3><br />
              <Avatar id={this.props.authedUser} /><br />
              <div>User: {this.props.authedUser}</div><br />
              <input type="button" className='inputNotSelected' value="Sign out" onClick={this.handleChange} />
            </div>
          </Fragment>
        )
      }

    }
}

function mapStateToProps({authedUser,users}) {
    return {
        userIds: Object.keys(users),
        user: users,
        authedUser
    }
}

export default connect(mapStateToProps)(AccountProfile);





