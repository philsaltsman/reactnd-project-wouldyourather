import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux'
import Question from './Question'

class HomeUnanswered extends Component {
    render() {
        //console.log(this.props)
      return (
          <Fragment>
              
            <div>
                <h3>Unanswered Questions</h3>

                <div>
                    
                        
                    {this.props.questionIds.map((id) => (
                                                
                        <li key={id}>
                            <Question id={id}/>
                        </li>

                        
                    ))}
                </div>
            </div>
              
          </Fragment>
        
     )
    }
}

function mapStateToProps({questions}) {
    return {
        questionIds: Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(HomeUnanswered);