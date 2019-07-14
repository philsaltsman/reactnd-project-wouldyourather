import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux'
import { handleAddQuestion} from '../actions/questions'
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component {

    state = {
        optOneText: '',
        optTwoText: '',
        submitted: 0,

    }
    handleOneChange = (e) => {
        const text = e.target.value
        this.setState(() => ({
            optOneText: text
        }))
    }
    handleTwoChange = (e) => {
        const text = e.target.value
        this.setState(() => ({
            optTwoText: text
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const { optOneText,optTwoText } = this.state
        const { dispatch, authedUser } = this.props

        const object = { optOneText,optTwoText,authedUser }

        dispatch(handleAddQuestion(object))

        this.setState(() => ({
            optOneText: '',
            optTwoText: '',
            submitted:1,
        }))
    }




    
    render() {

        const questionMaxLength=200
        const questionWarningLength=100

        const { optOneText, optTwoText } = this.state


        if (this.state.submitted===1) {
            return(
                <Redirect to='/' />
            )
        }


        const optOneLeft = questionMaxLength - optOneText.length
        const optTwoLeft = questionMaxLength - optTwoText.length

      return (
          <Fragment>
              <h3>Create New Question</h3>
              <br />
              <div className='newQuestion'>
                <h4>Would you rather ...</h4>
                <form onSubmit={this.handleSubmit}>
                    <input type='textfield' className='newInput' value={optOneText} placeholder='Insert first option here' onChange={this.handleOneChange} maxLength={questionMaxLength} />
                    &nbsp; &nbsp; {(optOneLeft <= questionWarningLength) && (
                            <Fragment>
                                {optOneLeft}/{questionMaxLength}
                            </Fragment>
                    )}
                    <div align='center'><h6>OR</h6></div>
                    <input type='textfield' className='newInput' value={optTwoText} placeholder='Insert second option here' onChange={this.handleTwoChange} maxLength={questionMaxLength} />
                    &nbsp; &nbsp; {(optTwoLeft <= questionWarningLength) && (
                            <Fragment>
                                {optTwoLeft}/{questionMaxLength}
                            </Fragment>
                    )}
                    <br />
                    <button
                        type='submit' 
                        className='submitBtn' 
                        disabled={optOneText===''||optTwoText===''||optOneText===optTwoText}>Create!</button>
                </form>
            </div>
          </Fragment>
        
     )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(NewQuestion);