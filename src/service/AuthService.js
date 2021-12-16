import { signInSuccess, getUserProfile, signOut } from "../actions";

export function checkAutoLogin(dispatch, userDetails) {
    const tokenDetails = localStorage.getItem('userToken');
    if(!tokenDetails) {
        dispatch(signOut())
    }
    if(tokenDetails) {
       dispatch(signInSuccess(userDetails, tokenDetails))
       dispatch(getUserProfile(tokenDetails))
    } 
}

