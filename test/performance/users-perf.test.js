import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 10 },
    { duration: '20s', target: 10 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(90)<3000', 'max<5000'],
  },
};

export default function () {
  const url = 'http://localhost:3000/users';

  const res = http.get(url);

  check(res, {
    'Validar que o status é 200': (r) => r.status === 200,
    'Validar que possui pelo menos 1 usuário': (r) => Array.isArray(r.json()) && r.json().length >= 1,
    'Validar que objeto possui username e saldo': (r) => {
      const arr = r.json();
      return Array.isArray(arr) && arr.every((u) => 'username' in u && 'saldo' in u);
    },
  });

  sleep(1);
};

