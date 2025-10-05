const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLogin = require('../fixtures/postLogin.json');

describe('POST /users/login', () => {
    it('Deve retornar 201 quando usuário logar com sucesso', async () => {
        const response = await request(process.env.BASE_URL)
            .post('/users/login')
            .set('Content-Type', 'application/json')
            .send(postLogin);
        expect(response.status).to.equal(200);
        expect(response.body.token).to.be.a('string');
    });
});