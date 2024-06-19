import http from 'k6/http';
import { check } from 'k6';
import { API_URL } from '../../config/envirement.js';
import { uid } from '../../helpers/common/uid.js';

const uuid = uid(10);

export const createUser = () => {
	//register user
	// curl -X POST -H "Content-Type: application/json" -d '{"email":"your-email@example.com", "password":"your-password"}' http://localhost:8080/register
	const payload = {
		email: `your-email-${uuid}@example.com`,
		password: `your-password-${uuid}`,
	};

	const res = http.post(`${API_URL}/register`, JSON.stringify(payload));
	// console.log(`STATUS:`, res.status);
	// console.log(`BODY:`, res.body);
	check(res, {
		'Register response code was 200': (res) => res.status == 200,
	});
	return payload;
};

export const login = (payload) => {
	//login user
	//curl -X POST -H "Content-Type: application/json" -d '{"email":"your-email@example.com", "password":"your-password"}' http://localhost:8080/login
	const res = http.post(`${API_URL}/login`, JSON.stringify(payload));
	// console.log(`STATUS:`, res.status);
	// console.log(`BODY:`, res.body);
	check(res, {
		'Login response code was 200': (res) => res.status == 200,
	});
	//extract token
	const token = JSON.parse(res.body).token;
	return token;
	// console.log(`TOKEN:`, token);
};
