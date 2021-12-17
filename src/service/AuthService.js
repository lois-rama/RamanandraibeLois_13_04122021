import { signInSuccess, getUserProfile, signOut } from "../actions";

export function checkAutoLogin(dispatch, userDetails, userError) {
    const tokenDetails = localStorage.getItem('userToken');
    if(!tokenDetails || userError === "unauthorized") {
        dispatch(signOut())
    }
    if(tokenDetails) {
       dispatch(signInSuccess(userDetails, tokenDetails))
       dispatch(getUserProfile(tokenDetails))
    } 
}

