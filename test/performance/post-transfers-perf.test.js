import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,            
  duration: '10s',   
};

export default function () {
  const url = 'http://localhost:3000/transfers'; 
  const payload = JSON.stringify({
    from: "123",
    to: "456",
    amount: 100
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(url, payload, params);

  
  check(res, {
    'status é 201': (r) => r.status === 201,
    'retorna id': (r) => r.json('id') !== undefined,
  });

  sleep(1);
}