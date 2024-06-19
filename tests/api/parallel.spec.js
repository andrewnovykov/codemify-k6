import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { API_URL } from '../../src/config/envirement.js';
import { addTimingsToTrends } from '../../src/metrics/trends.js';
import { apiTresholds } from '../../src/metrics/thresholds.js';
import { createUser, login } from '../../src/helpers/api/auth.js';
import { uid, uidNumber } from '../../src/helpers/common/uid.js';

const uuid = uid(10);
const unumber = uidNumber();

export const options = {
	setupTimeout: '3m',
	vus: 1,
	iterations: 1,
	thresholds: apiTresholds,
};

export function setup() {
	const payload = createUser();
	const token = login(payload);
	return token;
}

export default function test(token) {
	console.log(`DATA:`, token);
	group('Get All Items And Create Items', function () {
		const req1 = {
			method: 'GET',
			url: `${API_URL}/items`,
		};

		const itemPayload = { name: `item-name-${uuid}`, price: unumber };

		const req2 = {
			method: 'POST',
			url: `${API_URL}/items`,
			body: JSON.stringify(itemPayload),
			params: {
				headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			},
		};

		const responses = http.batch([req1, req2]);

		check(responses[0], {
			'response code was 200': (res) => res.status == 200,
		});
		sleep(1);
		const res = responses[0];
		addTimingsToTrends(res.timings);
	});
}
