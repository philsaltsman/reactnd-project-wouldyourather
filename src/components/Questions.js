import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { formatQuestion, formatDate } from '../utils/helpers';
import isVarUndefined from '../functions/isVarUndefined';
import { handleSaveAnswer} from '../actions/questions'


class Questions extends Component {

    optionBtn = (e,qid,answer) => {
        e.preventDefault()

        const { dispatch, authedUser } = this.props


        const object = { 
            authedUser,
            qid: qid,
            answer: answer,
        }

        dispatch(handleSaveAnswer(object))

    }



    render() {

        const {question } = this.props

        const {
            name, id, timestamp, avatar, optionOneVotes, optionOneText, optionTwoVotes, optionTwoText
        } = question

        if (question === null) {
            return <p>This Question doesn't exist</p>
        }

        
        var { firstArea, secondArea } = 'notCircled'

        if (this.props.choice==='optionOne') {
            firstArea='circled';
        } else {
            secondArea='circled';
        }


        if (isVarUndefined(this.props.choice)) {
            //DID NOT ANSWER
            return (
                <Fragment>
                    <h3>Question:</h3>
                    <div className='questionPoll' align='left'>
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
                                <b><i>Would You Rather...</i></b>
                            </div>
                            <br />
                            <div className='question-options'>

                            <button className='optionBtn' onClick={(e) => this.optionBtn(e,id,'optionOne')} >
                            ...{optionOneText}?
                            </button>
                            <div align='center'>
                                <i className='grayedoutinline'>
                                    - or -
                                </i>
                            </div>
                            <button className='optionBtn' onClick={(e) => this.optionBtn(e,id,'optionTwo')} >
                            ...{optionTwoText}? 
                            </button>
                            
                                
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        } else {
            //ANSWERED
            return (
                <Fragment>
                    <h3>Results</h3>
                    <div className='questionResults' align='left'>
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
                                <b><i>Would You Rather...</i></b>
                            </div>
                            <br /><br />
                            <div className='question-options'>

                                {(firstArea==='circled')
                                ? <Fragment><div className='smallredtxt'><i>- You answered -</i></div></Fragment>
                                : null
                                }
                                <div className={firstArea}>
                                    <font className='noSelect'>
                                        ...{optionOneText}?
                                    </font>
                                    <br />
                                    <font className='questionsResults'>
                                        Received {optionOneVotes.length} out of {optionOneVotes.length+optionTwoVotes.length} votes ... {Math.round((optionOneVotes.length / (optionOneVotes.length+optionTwoVotes.length)) *100)}%
                                    </font>
                                </div>
                                <br />
                                <div align='center'>
                                    <i className='grayedoutinline'>
                                        - or -
                                    </i>
                                </div>
                                {(secondArea==='circled')
                                ? <Fragment><div className='smallredtxt'><i>- You answered -</i></div></Fragment>
                                : null
                                }
                                <div className={secondArea}>
                                    <font className='noSelect'>
                                        ...{optionTwoText}?
                                    </font>
                                    <br />
                                    <font className='questionsResults'>
                                        Received {optionTwoVotes.length} out of {optionOneVotes.length+optionTwoVotes.length} votes ... {Math.round((optionTwoVotes.length / (optionOneVotes.length+optionTwoVotes.length)) *100)}%
                                    </font>
                                </div>

                              
                                
                            </div>
                        </div>
                    </div>
                </Fragment>
            )

        }

    }
}

function mapStateToProps({authedUser,users,questions},props) {

        const { id } = props.match.params;
    
        const question = questions[id];
        
        var answer = 'not answered';
        var wat = users[authedUser].answers[id];
        if (isVarUndefined()) {
            answer = wat;
        }


        return {
            authedUser,
            user: users,
            question: formatQuestion(question,users[question.author],authedUser),
            choice: answer,

        }

}

export default connect(mapStateToProps)(Questions);