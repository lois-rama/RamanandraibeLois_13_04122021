import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInAction, rememberMeTrue, rememberMeFalse } from "../actions"
import Error from "./Error";
import '../styles/pages/SignIn.css'

export default function SignIn() {
    const [userDetails, setUser] = useState({email: "", password: ""});
    const [rememberMe, setRememberMe] = useState(false);
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(userDetails);
    console.log(userDetails);

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    
    function onSignIn(event){
        event.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (userDetails.email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }

        if (userDetails.password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }

        setErrors(errorObj);

        if (error) return;
        console.log('form submit')

        dispatch(signInAction(userDetails));
    }
    function onRememberMeCheck(event){
        let checked = event.target.checked

        if(checked) {
            setRememberMe(true)
            dispatch(rememberMeTrue())
        }
        else if (checked === false){
            setRememberMe(false)
            dispatch(rememberMeFalse())
        }
    }
    
    if(user.error) return <Error error={user.error}/>
    
    return(
        <main className="main bg-dark">
            {user.error === "response" && <h1>Oups une erreur s'est produite.</h1> }
            {user.error === "request" ? <h1>Service indisponible.</h1> :
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={onSignIn}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                            <input type="text" id="username" value={userDetails.email}
                            onChange={event => setUser({email: event.target.value, password: userDetails.password})
                            }/>
                    </div>
                    {errors.email && <div>{errors.email}</div>}
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={userDetails.password}
                            onChange={event => setUser({email: userDetails.email, password: event.target.value})}/>
                    </div>
                    {errors.password && <div>{errors.password}</div>}
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" checked={rememberMe ? true : false} onChange={onRememberMeCheck}/>
                        <label htmlFor="remember-me">Remember me </label>
                    </div>
                    <button className="sign-in-button">Sign In</button>
                </form>
            </section> }
        </main>
    )
}
