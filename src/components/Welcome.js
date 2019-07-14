import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom'


class Welcome extends Component {
   
    render() {
        return (
            <Fragment>
                <div>
                    <h3>Welcome to Would you Rather!</h3><br /><br />
                    You must <NavLink to='/signin' activeClassName='active'><u>Sign in</u></NavLink> to play/view content<br />
                </div><br />
            </Fragment>
        )
    }
}



export default Welcome

