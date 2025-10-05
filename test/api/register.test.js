const request = require('supertest');
require('dotenv').config();

describe('POST /users/register', () => {
    it('Deve retornar 201 quando usuário for criado com sucesso', async () => {
        const response = await request(process.env.BASE_URL)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({
                "username": "edson",
                "password": "123456",
                "favorecidos": ["paulo"]
            });

        expect(response.status).to.equal(201);
        expect(response.body).to.deep.equal({
            "username": "edson",
            "favorecidos": ["paulo"],
            "saldo": 10000
        });
    });

    it('Deve retornar 400 quando usuário já existir', async () => {
        const response = await request(process.env.BASE_URL)
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