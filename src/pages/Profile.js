import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { getUserProfile, editUserProfile } from '../actions/index';

import { accounts } from '../data/data';
import Account from '../components/Account';
import '../styles/pages/Profile.css';

export default function Profile() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [isEditing, setEditing] = useState(false);
	const [editedProfile, setEditedProfile] = useState({
		firstName: '',
		lastName: '',
	});

	useEffect(() => {
		dispatch(getUserProfile(user.token));
	}, []);

	function onSave(event) {
		event.preventDefault();

		setEditedProfile({ firstName: '', lastName: '' });
		setEditing(false);
		
		if (editedProfile.firstName && editedProfile.lastName !== '') {
			dispatch(editUserProfile(editedProfile.firstName, editedProfile.lastName,user.token));
		}
	};
    console.log("ok")
	if (!user.isSignedIn) return <Navigate to='/sign-in
	' />;
	console.log("ok")

	return (
		<main className='main bg-dark'>
			{!isEditing ? (
				<div className='header'>
					<h1> Welcome back <br />
						{user.firstName} {user.lastName} !
					</h1>
					<button className='edit-button' onClick={() => setEditing(true)}>
						Edit Name
					</button>
				</div>
			) : (
				<div className='header'>
					<h1>Welcome back</h1>
					<form onSubmit={onSave}>
						<div className='editInputs'>
							<input id='firstNameInput' type='text' placeholder={user.firstName} value={editedProfile.firstName}
							onChange={event => setEditedProfile({firstName:event.target.value , lastName: editedProfile.lastName})
                            }/>
							<input id='lastNameInput' type='text' placeholder={user.lastName} value={editedProfile.lastName}
							onChange={event => setEditedProfile({firstName: editedProfile.firstName, lastName:event.target.value })
                            }/>
						</div>
						<div className='buttons'>
							<button className='edit-button' type='submit'>
								Save
							</button>
							<button className='edit-button' onClick={() => setEditing(false)}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}

			<h2 className='sr-only'>Accounts</h2>
			{accounts.map((account, index) => (
				<Account
					key={index}
					title={account.title}
					amount={account.amount}
					description={account.description}
				/>
			))}
		</main>
	);
};