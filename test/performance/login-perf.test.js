import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    iterations: 50,
    thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(90)<60', 'max <70'],
  },
};

export default function () {
    const url = 'http://localhost:3000/users/login';
    const payload = JSON.stringify({
        username: 'julio',
        password: '123456'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);
    check(res, {
        'Validar que o status é 200': (r) => r.status === 200,
        'Validar que o tken é string': (r) => typeof(r.json().token) == 'string'
    });

    sleep(1);
};

