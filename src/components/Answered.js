import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import QuestionElement from './QuestionElement'
//import isVarUndefined from '../functions/isVarUndefined';

class Home extends Component {
    
    render() {

        function answered(id,arr) {
        
            if ((arr.filter(aid => {
                return (aid === id)
            })).length > 0) {
                return true
            } else {
                return false
            }

        }
        var trimAnswered = this.props.questionIds.filter(id => {
            return (answered(id,this.props.answerIds))
        })
        
    
        if (trimAnswered.length<1) {
            return (
            <Fragment>
                 <div>

                    <div className='questionsheading'>
                        <NavLink exact to='/' className='barRight'>Unanswered Questions</NavLink>
                        <NavLink to='/answered' className='padLeft'>Answered Questions</NavLink>
                    </div>

                    <br /><br />

                    You have not answered any questions!  Get out there!

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


                    

                        {trimAnswered.map(id => (
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