import { combineReducers } from 'redux';
import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_ERROR } from '../actions';
const initialState = {
    signInRequest: false,
	isSignedIn: false,
	error: null,
	userDetails:{
        email:'',
        password:'',
    },
	token: '',
	firstName: '',
	lastName: '',
};

const user = (state = initialState, action) => {
    switch(action.type) {
        case SIGN_IN_REQUEST:
            return {
                ...state,
            };
        case SIGN_IN_SUCCESS:
            return {
                ...state,
	            isSignedIn: true,
	            userDetails: action.payload.userDetails,
	            token: action.payload.token,
            }
         case SIGN_IN_ERROR:
            return { 
                ...state,
                error: action.payload.message,
            };
        default:
            return state;

    }
}

export const rootReducer = combineReducers({user})

export default rootReducer