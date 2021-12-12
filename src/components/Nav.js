import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import '../styles/components/Nav.css'
import logo from '../img/argentBankLogo.png';
import { signOut } from '../actions';

export default function Nav() {
    const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
                {!user.isSignedIn ? (
				<div>
					<Link className='main-nav-item' to='/sign-in'>
						<i className='fa fa-user-circle'></i>
						Sign In
					</Link>
				</div>
			) : (
				<div>
					<Link className='main-nav-item' to='/profile'>
						<i className='fa fa-user-circle'></i> 
						{user.firstName}
					</Link>
					<Link
						className='main-nav-item'
						to='/' onClick={() => dispatch(signOut())}
					>
						<i className='fa fa-sign-out'></i>
						Sign Out
					</Link>
				</div>
			)}
        </nav>
    );
}