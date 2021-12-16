import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:3001/api/v1/user',
});

export const signInRequest = async (user) => {
	const res = await instance.post(`/login`, user);
	return res.data.body.token;		
};

export const userProfileRequest = async (token) => {
	const res = await instance.post('/profile',{},{headers: {Authorization: `Bearer ${token}`}});
	return res.data.body;
}

export const updateUserProfile = async (firstName, lastName, token) => {
	const res = await instance.put('/profile',{ firstName, lastName },{ headers: { Authorization: `Bearer ${token}` } });
	return res;
}

export function handlingErrors(error){
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		return "response"
	  } else if (error.request) {
		// The request was made but no response was received
		return "request"
	  } else {
		// Something happened in setting up the request that triggered an Error
		console.log('Error', error.message);
	  }
};
