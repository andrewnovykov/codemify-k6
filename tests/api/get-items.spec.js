import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { API_URL } from '../../src/config/envirement.js';
import { addTimingsToTrends } from '../../src/metrics/trends.js';
import { apiTresholds } from '../../src/metrics/thresholds.js';
import { createUser, login } from '../../src/helpers/api/auth.js';
import { createItems } from '../../src/helpers/api/items.js';

export const options = {
	setupTimeout: '3m',
	vus: 1,
	iterations: 1,
	thresholds: apiTresholds,
};

export function setup() {
	const payload = createUser();
	const token = login(payload);
	const data = createItems(token, 100);
	return data;
}

export default function test(data) {
	console.log(`DATA:`, data);
	group('Get All Items', function () {
		const res = http.get(`${API_URL}/items`);
		check(res, {
			'response code was 200': (res) => res.status == 200,
		});
		sleep(1);
		addTimingsToTrends(res.timings);
	});
}
