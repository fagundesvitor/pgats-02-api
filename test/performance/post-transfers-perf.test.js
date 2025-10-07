import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '10s',
};

export default function () {
  const url = 'http://localhost:3000/transfers';
  const payload = JSON.stringify({
    from: "wencha",
    to: "vitor",
    value: 100
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer    ' // insira seu token gerado por postman aqui
    }
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status é 201': (r) => r.status === 201,
    
  });

  sleep(1);
}