import { signInRequest, userProfileRequest, updateUserProfile, handlingErrors } from "../service/API";

export const SIGN_IN_REQUEST = 'auth/signInRequest'
export const SIGN_IN_SUCCESS = 'auth/signInSuccess'
export const SIGN_OUT = 'auth/signOut'
export const SIGN_IN_ERROR = 'auth/signInError'

export const REMEMBER_ME_TRUE = 'auth/rememberMeChecked'
export const REMEMBER_ME_FALSE = 'auth/rememberMeNotChecked'


export const EDIT_USER_PROFILE = 'profile/editUserProfile';
export const EDIT_USER_PROFILE_ERROR = 'profile/editUserProfileError'

export const signInAction = (userDetails) => {
	return async (dispatch) => {
		dispatch({ type: SIGN_IN_REQUEST});
		try {
			const token = await signInRequest(userDetails)
			dispatch(signInSuccess(userDetails, token))
		} catch (error) {
			let errorType = handlingErrors(error)
			dispatch(signInError(errorType));
			console.log(errorType)
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

export const signOut = () => {
	localStorage.removeItem('userToken')
	return {
		type: SIGN_OUT,
	};
}

export const rememberMeTrue = () => {
	return {
		type: REMEMBER_ME_TRUE,
	}
};

export const rememberMeFalse = () => {
	return {
		type: REMEMBER_ME_FALSE,
	}
};


export const getUserProfile = (token) => {
	return async (dispatch) => {
		try {
			const res = await userProfileRequest(token)
			dispatch({
				type: EDIT_USER_PROFILE,
				payload: {
					firstName: res.firstName,
					lastName: res.lastName,
				},
			});
		} catch (error) {
			let errorType = handlingErrors(error)
			dispatch(editUserProfileError(errorType));
			if(errorType === 'unauthorized') {
				dispatch(signOut())
			}
		}
	};
};

export const editUserProfile = (firstName, lastName, token) => {
	return async (dispatch) => {
		try {
			await updateUserProfile(firstName, lastName, token)
			dispatch({
				type: EDIT_USER_PROFILE,
				payload: {
					firstName,
					lastName,
				},
			});
		} catch (error) {
			let errorType = handlingErrors(error)
			dispatch(editUserProfileError(errorType));
		}
	};
};

export const editUserProfileError = (error) => {
	return {
		type: EDIT_USER_PROFILE_ERROR,
		payload: error,
	};
};