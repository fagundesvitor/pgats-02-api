const request = require('supertest');
const { expect } = require('chai');

describe('POST /users/register', () => {
    it('Deve retornar 201 quando usuário for criado com sucesso', async () => {
        const response = await request('http://localhost:3000')
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({
                "username": "vitor5",
                "password": "123456",
                "favorecidos": ["vitor"]
            });

        expect(response.status).to.equal(201);
        expect(response.body).to.deep.equal({
            "username": "vitor5",
            "favorecidos": ["vitor"],
            "saldo": 10000
        });
    });

    it('Deve retornar 400 quando usuário já existir', async () => {
        const response = await request('http://localhost:3000')
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
        expect(response.body.error).to.equal('Usuário já existe');
    });
});