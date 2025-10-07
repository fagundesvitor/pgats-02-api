import http from 'k6/http';
import { sleep, check } from 'k6';
const postRegisterPerf =JSON.parse(open('../fixtures/postRegisterPerf.json')); 

export const options = {
    stages: [
        {duration: '5s', target: 10},
        {duration: '20s', target: 10},
        {duration: '5s', target: 0},
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(90)<3000', 'max <5000'],
    },
};

export default function () {
    const url = 'http://localhost:3000/users/register';
    const payload = {
        username: `${postRegisterPerf.username}_${__VU}_${__ITER}`,
        password: postRegisterPerf.password,
        favorecidos: postRegisterPerf.favorecidos,
    };

    const res = http.post(url, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    check(res, {
        'Validar que o status é 201': (r) => r.status === 201,
        'Validar que o token é string': (r) => r.headers['Content-Type'] && r.headers['Content-Type'].includes('application/json'),
    });

    sleep(1);
};