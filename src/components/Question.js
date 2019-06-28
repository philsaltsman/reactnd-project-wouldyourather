import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'


class Question extends Component {
    optionBtn = (e, id, option) => {
        e.preventDefault()

        // todo: 
        // send the data for the respective option
        // and Redirect to component displaying total votes for that question
    }
    render() {
        console.log(this.props)

        const {question } = this.props

        if (question === null) {
            return <p>This Question doesn't exist</p>
        }

        const {
            name, id, timestamp, avatar, optionOneVotes, optionOneText, optionTwoVotes, optionTwoText
        } = question
        

        return (
            <div className='question' align='left'>
                {/*<ul id={this.props.id}>{this.props.id}</ul>*/}
                <div className='question-avatar'>
                    <img 
                        src={avatar}
                        alt={`Avatar of `}
                        className='avatar'
                    />
                </div>
                <div className='question-details'>
                    <div className='question-info' align='right'>
                        {name} asked on {formatDate(timestamp)}
                    </div>
                    <br />
                    <div className='question-title' align='center'>
                        <b><i>Would you rather</i></b>
                    </div>
                    <br />
                    <div className='question-options'>
                        <button className='optionBtn' onClick={(e) => this.optionBtn(e,id,1)} >
                        {optionOneText}?
                        </button>
                       { /*Votes:  {optionOneVotes.length} / {optionOneVotes.length+optionTwoVotes.length} */ }
                        <br /><br />
                        <button className='optionBtn' onClick={(e) => this.optionBtn(e,id,2)} >
                        {optionTwoText}? 
                        </button>
                         
                        { /* Votes:  {optionTwoVotes.length} / {optionOneVotes.length+optionTwoVotes.length} */ }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser,users,questions},{id}) {
    const question = questions[id]

    return {
        authedUser,
        user: users,
        //question: question,
        question: formatQuestion(question,users[question.author],authedUser)
    }
}

export default connect(mapStateToProps)(Question);