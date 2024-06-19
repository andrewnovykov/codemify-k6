import { Trend } from 'k6/metrics';

const duration = new Trend('duration');
const blocked = new Trend('blocked');
const connecting = new Trend('connecting');
const sending = new Trend('sending');
const waiting = new Trend('waiting');
const receiving = new Trend('receiving');

export const addTimingsToTrends = (responseTiming) => {
	duration.add(responseTiming.duration);
	blocked.add(responseTiming.blocked);
	connecting.add(responseTiming.connecting);
	sending.add(responseTiming.sending);
	waiting.add(responseTiming.waiting);
	receiving.add(responseTiming.receiving);
};
