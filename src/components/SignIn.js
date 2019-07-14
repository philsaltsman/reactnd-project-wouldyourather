import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import Avatar from './Avatar'
import { isUndefined } from 'util';
import { Redirect } from 'react-router-dom';
import isVarUndefined from '../functions/isVarUndefined';


class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {select: '',auth: this.props.authedUser};
        

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }


    anySelected = () => {
        if (this.state.select === '' || this.state.select === undefined || isUndefined(this.state.select)) {
            return (false)
        } else {
            return (true)
        }
    }

      showTitle = () => {

        if (this.anySelected()) {
            return (
                <Fragment>
                    <h3>Is that you {this.state.select}?</h3>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                <h3>Select User</h3>
            </Fragment>
            )
        }
    }



      drawBtn = () => {

        if (this.anySelected()) {
            return (
                <Fragment>
                    <input type="submit" className='inputNotSelected' value="Login!" />
                </Fragment>
            )
        } else {
            return (null)
        }
    }

      handleChange(event) {
          this.setState({select: event.target.value});   
      }
      handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(setAuthedUser(this.state.select))
        this.props.history.push('/')
        return (
            <Redirect to='/' />
        )
    }

        



    render() {

        
        if (!isVarUndefined(this.props.authedUser)) {
            return (
                <Redirect to='/profile' />
            )
        }


      return (
          <Fragment>
              <div>
                {this.showTitle()}

                <div>
                    <form onSubmit={this.handleSubmit}>

                        {this.props.userIds.map((id) => {
                            if (this.state.select === id) {
                                return (
                                    <Fragment key={id}>
                                        <Avatar id={id} />
                                        <input type="button" className='inputSelected' value={id} onClick={this.handleChange} />
                                        <br />
                                    </Fragment>
                                )
                            } else {
                                return (
                                    <Fragment key={id}>
                                        <input type="button" className='inputNotSelected' value={id} onClick={this.handleChange} />
                                        <br />
                                    </Fragment>
                                )
                            }
                            

                            
                        })}

                        <br />
                        {this.drawBtn()}
                    
                    </form>    
                </div>
            </div>
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

export default connect(mapStateToProps)(SignIn);





