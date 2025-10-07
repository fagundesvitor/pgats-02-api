const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postRegister = require('../fixtures/postRegister.json');

describe('POST /users/register', () => {
    it('Deve retornar 201 quando usuário for criado com sucesso', async () => {
        const randomUsername = `vitor_${Date.now()}`;
        const bodyRegister = { ...postRegister, username: randomUsername };
        const response = await request(process.env.BASE_URL_REST)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(bodyRegister);
        expect(response.status).to.equal(201);
        expect(response.body).to.deep.equal({
            "username": randomUsername,
            "favorecidos": ["paulo"],
            "saldo": 10000
        });
    });

    it('Deve retornar 400 quando usuário já existir', async () => {
        const response = await request(process.env.BASE_URL_REST)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({
                "username": "vitor",
                "password": "123456",
                "favorecidos": [
                    "vitor"
                ]
            });
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Usuário já existe");
        console.log(response.body)
    });
});