import { RECEIVE_USERS, SAVE_ANSWER, ADD_QUESTION } from '../actions/users'

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS : 
            return {
                ...state,
                ...action.users
            }
        case SAVE_ANSWER :
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }
         case ADD_QUESTION :
           return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat([action.question])
                }
            }
         
        default : 
            return state

    }
}




