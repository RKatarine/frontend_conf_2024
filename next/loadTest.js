import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:4000';

// Options to define the load test
export let options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp-up to 10 users over 30 seconds
    { duration: '10m', target: 10 },  // Stay at 10 users for 1 minute
    { duration: '30s', target: 0 },  // Ramp-down to 0 users over 30 seconds
  ],
};

function loadCategory (slug) {
  let res = http.get(`${BASE_URL}/metro/${slug}`);

  // Check if the response status is 200 (OK)
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}

// Test function to be executed by each virtual user
export default function () {
  loadCategory('sweet');
  loadCategory('chocolate');
  // Wait for 1 second between iterations
  sleep(1);
}
