import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { formatQuestion, formatDate } from '../utils/helpers'
import isVarUndefined from '../functions/isVarUndefined';


class Question extends Component {

    render() {


        const {question } = this.props

        if (isVarUndefined(question)) {
            return <p><b>404</b> - This Question doesn't exist</p>
        }

        const {
            name, id, timestamp, avatar, optionOneText, optionTwoText
        } = question


        return (
            <Link to={'/questions/'+id}>
            <div className='question' align='left'>
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
                        <b><i>Would you Rather...</i></b>
                    </div>
                    <br />
                    <div className='question-options'>
                        <div className='noSelect'>...{optionOneText}?</div>
                        <div className='center'>
                            <i className='grayedout'>- or -</i>
                        </div>
                        <div className='rightNoSelect'>...{optionTwoText}?</div>
                    </div>
                    <div className='question-bottom'>
                        Click here to view
                    </div>
                </div>
            </div>
            </Link>
        )
    }
}

function mapStateToProps({authedUser,users,questions},{id}) {
    const question = questions[id]

    return {
        authedUser,
        user: users,
        question: formatQuestion(question,users[question.author],authedUser)
    }
}

export default connect(mapStateToProps)(Question);