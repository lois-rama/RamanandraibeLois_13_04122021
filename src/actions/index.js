import { signInRequest } from "../service/API";

export const SIGN_IN_REQUEST = 'auth/signInRequest'
export const SIGN_IN_SUCCESS = 'auth/signInSuccess'
export const SIGN_IN_ERROR = 'auth/signInError'


export const signInAction = (userDetails) => {
	return async (dispatch) => {
		dispatch({ type: SIGN_IN_REQUEST});
		try {
			const token = await signInRequest(userDetails)
			dispatch(signInSuccess(userDetails, token))
		} catch (error) {
			dispatch(signInError(error));
			
		}
	};
};

export const signInSuccess = (userDetails, token) => {
	return {
		type: SIGN_IN_SUCCESS,
		payload: {
			userDetails,
			token
		}
	}
}

export const signInError = (error) => {
	return {
		type: SIGN_IN_ERROR,
		payload: error,
	}
}