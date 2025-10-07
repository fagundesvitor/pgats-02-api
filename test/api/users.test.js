const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('GET /users', () => {
    it('Deve retornar 200 ao enviar requisição', async () => {
        const response = await request(process.env.BASE_URL_REST).get('/users');
        expect(response.status).to.equal(200);
    });
});