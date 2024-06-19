export const apiTresholds = {
	http_req_failed: ['rate<0.01'], // http errors should be less than 1%
	duration: ['p(95)<200'], // 95% of requests should be below 200ms
};
