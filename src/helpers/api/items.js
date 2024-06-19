import http from 'k6/http';
import { check } from 'k6';
import { API_URL } from '../../config/envirement.js';
import { uid, uidNumber } from '../../helpers/common/uid.js';

const unumber = uidNumber();
const uuid = uid(10);

export const createItem = (token) => {
	//create items
	//curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer your-token" -d '{"name":"item-name", "price":10.5}' http://localhost:8080/items
	const itemPayload = { name: `item-name-${uuid}`, price: unumber };
	const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
	const res = http.post(`${API_URL}/items`, JSON.stringify(itemPayload), { headers: headers });
	// console.log(`STATUS:`, res.status);
	// console.log(`BODY:`, res.body);
	check(res, {
		'Create Item response code was 201': (res) => res.status == 201,
	});
	//return res data
	return JSON.parse(res.body);
};

export const createItems = (token, number) => {
	const data = [];
	for (let i = 0; i < number; i++) {
		const item = createItem(token);
		data.push(item);
	}
	return data;
};
