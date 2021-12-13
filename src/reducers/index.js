import { combineReducers } from 'redux';
import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_ERROR, SIGN_OUT, EDIT_USER_PROFILE, EDIT_USER_PROFILE_ERROR, REMEMBER_ME_FALSE, REMEMBER_ME_TRUE } from '../actions';
const initialState = {
    signInRequest: false,
	isSignedIn: false,
    rememberMe: false,
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
                signInRequest: true,
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

        case REMEMBER_ME_TRUE:
            return {
                ...state,
                rememberMe: true
            };

         case REMEMBER_ME_FALSE:
            return {
                ...state,
                rememberMe: false
            };

        case SIGN_OUT:
            return initialState;
        
        case EDIT_USER_PROFILE:
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
            };
        case EDIT_USER_PROFILE_ERROR:
            return { 
                ...state,
                error: action.payload.error
            };
        default:
            return state;

    }
}

export const rootReducer = combineReducers({user})

export default rootReducer