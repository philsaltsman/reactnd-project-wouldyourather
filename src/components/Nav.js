import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { isVarUndefined } from '../functions/isVarUndefined';


class Nav extends Component {


    constructor(props) {
        super(props);
        this.state = {auth: this.props.authedUser};
      }

      
      signedIn = () => {
        
        if (isVarUndefined(this.props.authedUser)) {
            return (false)
        } else {
            return (true)
        }

      }


    render () {

        
        if (this.signedIn()) { 
            return (
                <Fragment>
                    
                    <nav className='nav'>
                        
                        <div align='right' className='topRightNavBtn'>
                            {/*<NavLink to='/profile' className='navlinks' activeClassName='active'>Yo, {this.props.authedUser}!</NavLink>*/}
                            <NavLink to='/profile' className='navlinks' activeClassName='active'>
                                <img 
                                    src={this.props.avatar}
                                    alt={`Avatar`}
                                    className='avatarNav'
                                />
                                {this.props.authedUser}
                            </NavLink>
                            &nbsp;&nbsp;
                            <NavLink to='/signout' className='navlinks' activeClassName='active'>Sign out</NavLink>             
                        </div>
                        <ul className='navul'>
                            <li>
                                <NavLink exact to='/' className='navlinks' activeClassName='active'>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to='/add' className='navlinks' activeClassName='active'>
                                    Create New Question
                                </NavLink>
                            </li>
          
                            <li>
                                <NavLink exact to='/leaderboard' className='navlinks' activeClassName='active'>
                                    Leader Board
                                </NavLink>
                            </li>
                        </ul>

                                         
                            
                        
                    </nav>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <nav className='nav'>
                        <div align='right' className='topRightNavBtn'>
                            <NavLink to='/signin' className='navlinks' activeClassName='active'>SignIn</NavLink>                 
                        </div>
                        <ul className='navul'>
                            <li>
                                <div className='grayedout'>
                                    Home
                                </div>
                            </li>
                            <li>
                                <div className='grayedout'>
                                    Create New Question
                                </div>
                            </li>
                            <li>
                                <div className='grayedout'>
                                    Leader Board
                                </div>
                            </li>
                        </ul>
                                         
                            
                        
                    </nav>
                </Fragment>
            )
        }

        
    }
}


function mapStateToProps({authedUser='',users}) {

    var avatarpic=''
    if (isVarUndefined(authedUser)) {
        avatarpic=''
    } else {
        avatarpic=users[authedUser].avatarURL;
    }

    return {
        userIds: Object.keys(users),
        avatar: avatarpic,
        authedUser
    }
}

export default connect(mapStateToProps)(Nav);