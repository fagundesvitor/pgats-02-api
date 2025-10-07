const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLogin = require('../fixtures/postLogin.json');

describe('POST /users/login', () => {
    it('Deve retornar 201 quando usuário logar com sucesso', async () => {
        const response = await request(process.env.BASE_URL_REST)
            .post('/users/login')
            .set('Content-Type', 'application/json')
            .send(postLogin.sucesso);
        expect(response.status).to.equal(200);
        expect(response.body.token).to.be.a('string');
    });

    it('Deve retornar 400 quando não informar a senha', async () => {
        const response = await request(process.env.BASE_URL_REST)
            .post('/users/login')
            .set('Content-Type', 'application/json')
            .send(postLogin['sem-senha']);
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Usuário e senha obrigatórios");
        console.log(response.body);
    });

    it('Deve retornar 400 quando não informar o usuário', async () => {
        const response = await request(process.env.BASE_URL_REST)
            .post('/users/login')
            .set('Content-Type', 'application/json')
            .send(postLogin['sem-usuario']);
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Usuário e senha obrigatórios");
        console.log(response.body);
    });
});