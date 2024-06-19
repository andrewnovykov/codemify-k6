import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { API_URL } from '../../src/config/envirement.js';
import { addTimingsToTrends } from '../../src/metrics/trends.js';
import { apiTresholds } from '../../src/metrics/thresholds.js';

export const options = {
	// Key configurations for spike in this section
	scenarios: {
		spike: {
			executor: 'ramping-vus',
			stages: [
				{ duration: '1m', target: 10 }, // fast ramp-up to a high point
				// No plateau
				{ duration: '1m', target: 0 }, // quick ramp-down to 0 users
			],
		},
	},
	thresholds: apiTresholds,
};

export default function test() {
	group('Health Check stress', function () {
		const res = http.get(`${API_URL}/items`);
		check(res, {
			'response code was 200': (res) => res.status == 200,
		});
		sleep(1);
		addTimingsToTrends(res.timings);
	});
}
