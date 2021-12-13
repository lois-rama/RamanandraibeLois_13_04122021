import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Nav from './components/Nav';
import Footer from './components/Footer';

import { checkAutoLogin } from './service/AuthService';

function App() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch()

	useEffect(() => {
		checkAutoLogin(dispatch, user.userDetails);
	}, []);

	let routes = (
		<Routes>
			<Route exact path='/' element={<Homepage/>} />
          	<Route exact path='/sign-in' element={<SignIn/>} />
		</Routes>
	)

	if(user.isSignedIn) {
		routes = (
			<Routes>
				<Route exact path='/' element={<Homepage/>} />
				<Route exact path='/profile' element={<Profile/>} />
				<Route path='/sign-in' element={user.isSignedIn ? <Navigate to="/profile"/> : <SignIn/>}/>
			</Routes>
		)
	}

  return (
    <div className='App'>
			<BrowserRouter>
				<Nav />
				{routes}
				<Footer />
			</BrowserRouter>
		</div>
  );
}

export default App;
