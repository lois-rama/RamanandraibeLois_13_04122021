import { signInSuccess, getUserProfile } from "../actions";

export function checkAutoLogin(dispatch, userDetails) {
    const tokenDetails = localStorage.getItem('userToken');
    dispatch(signInSuccess(userDetails, tokenDetails))
    dispatch(getUserProfile(tokenDetails))
}