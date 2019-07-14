import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion (obj) {
    return (dispatch, getState ) => {
        const { authedUser } = getState()
        //console.log('this is ob',obj)
        dispatch(showLoading())

        return saveQuestion({
            optionOneText: obj.optOneText,
            optionTwoText: obj.optTwoText,
            author: authedUser,
        })
        .then((question) => dispatch(addQuestion(question)))
        .then(() => dispatch(hideLoading()))
    }
}

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

function saveAnswer ({authedUser,qid,answer}) {
    return {
        type: SAVE_ANSWER,
        authedUser,
        qid,
        answer,
    }
}

export function handleSaveAnswer (info) {
    return (dispatch) => {
        dispatch(saveAnswer(info))

        return saveQuestionAnswer(info)
            .catch((e) => {
                console.warn('Error in handleSaveAnswer: ', e)
                dispatch(saveAnswer(info))
                alert('There was an error answering the question.  Try again.')
            })
    }
}