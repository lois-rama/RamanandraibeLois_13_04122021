import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:3001/api/v1/user',
});

export const signInRequest = async (user) => {
			const res = await instance.post(`/login`, user);
			return res.data.body.token;		
};

