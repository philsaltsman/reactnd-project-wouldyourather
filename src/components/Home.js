import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import QuestionElement from './QuestionElement'
//import isVarUndefined from '../functions/isVarUndefined';

class Home extends Component {
    
    render() {

        function notAnswered(id,arr) {
           
            if ((arr.filter(aid => {
                return (aid !== id)
            })).length < (arr.length)) {
                return false
            } else {
                return true
            }

        }
        var trimNotAnswered = this.props.questionIds.filter(id => {
            return (notAnswered(id,this.props.answerIds))
        })
        
        if (trimNotAnswered.length<1) {
            return (
            <Fragment>
                 <div>

                    <div className='questionsheading'>
                        <NavLink exact to='/' className='barRight'>Unanswered Questions</NavLink>
                        <NavLink to='/answered' className='padLeft'>Answered Questions</NavLink>
                    </div>


                    <br /><br />

                    There are no unanswered questions at this time.  Please try again.

                </div>
            </Fragment>
            )
        } else {

        

            return (
                <Fragment>
                    
                    <div>

                        <div className='questionsheading'>
                            <NavLink exact to='/' className='barRight'>Unanswered Questions</NavLink>
                            <NavLink to='/answered' className='padLeft'>Answered Questions</NavLink>
                        </div>


                        <br />


                        

                            {trimNotAnswered.map(id => (
                                <Fragment key={id}>
                                <li>
                                    <QuestionElement id={id}/>
                                </li>
                                </Fragment>
                            ))}

                        
                    </div>



                    
                </Fragment>
                
            )
        }
    }
}

function mapStateToProps({questions,users,authedUser}) {

    return {
        questionIds: Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        answerIds: Object.keys(users[authedUser].answers),
        authedUser,
    }
}

export default connect(mapStateToProps)(Home);