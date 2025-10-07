import http from 'k6/http';
import { check, sleep } from 'k6';


export const options = {
  vus: 10, 
  duration: '15s', 
};

const BASE_URL_REST = 'http://localhost:3000'; 

export default function () {

  let res1 = http.get(`${BASE_URL_REST}/transfers`);
  check(res1, {
    'GET /transfers status 200': (r) => r.status === 200,
  });

 
  let res2 = http.get(`${BASE_URL_REST}/users`);
  check(res2, {
    'GET /users status 200': (r) => r.status === 200,
  });

  
  sleep(1); 
}