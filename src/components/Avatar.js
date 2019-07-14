import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isUndefined } from 'util';


class Avatar extends Component {
    

    render() {
        console.log(this.props)

        const {user } = this.props

        if (user === null) {
            return <p>This user doesn't exist</p>
        }

        
        const {
            id,avatarURL
        } = user

        if (id === '' || id === undefined || isUndefined(id) || id === null ) {
            return (
                <div>Invalid avatar</div>

            )
            
        } else {

            return (
                <div className='avatar' align='center'>

                    <div className='signin-avatar'>
                        <img 
                            src={avatarURL}
                            alt={`Avatar of `+id}
                            className='avatar'
                        />
                    </div>
                    
                </div>
            )

            

        }
    }
}

function mapStateToProps({users},{id=''}) {
    const user = users[id]

    return {
        user: user,
    }
}

export default connect(mapStateToProps)(Avatar);