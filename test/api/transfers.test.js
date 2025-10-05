const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao.js')
const postTransfers = require('../fixtures/postTransfers.json')

describe('Transfers', () => {
    describe('POST /transfers', () => {
        let token

        beforeEach(async () => {
            token = await obterToken("vitor", "123456");
        })

        it('Deve retornar 201 quando o valor da transferencia for válido', async () => {
            const bodyTransfers = { ...postTransfers };
            const response = await request(process.env.BASE_URL)
                .post('/transfers')
                .set('Content-type', 'Application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers.sucesso);
            expect(response.status).to.equal(201);
        });

        it('Deve retornar 400 quando o destinatário for inexistente', async () => {
            const bodyTransfers = { ...postTransfers }
            const response = await request(process.env.BASE_URL)
                .post('/transfers')
                .set('Content-type', 'Application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers['destinatario-inexistente']);
            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal("Usuário remetente ou destinatário não encontrado");
        });

        it('Deve retornar 400 quando o remetente for inexistente', async () => {
            const bodyTransfers = { ...postTransfers }
            const response = await request(process.env.BASE_URL)
                .post('/transfers')
                .set('Content-type', 'Application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers['remetente-inexistente']);
            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal("Usuário remetente ou destinatário não encontrado");
        });

        it('Deve retornar 401 quando o token for inválido ou não for informado', async () => {
            const bodyTransfers = { ...postTransfers }
            const response = await request(process.env.BASE_URL)
                .post('/transfers')
                .set('Content-type', 'Application/json')
                //.set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers.sucesso);
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal("Token não fornecido.");
            console.log(response.body);
        })
        it('Deve retornar 400 quando não tem saldo suficiente', async () => {
            const bodyTransfers = { ...postTransfers }
            const response = await request(process.env.BASE_URL)
                .post('/transfers')
                .set('Content-type', 'Application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers['saldo-inexistente']);
            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal("Saldo insuficiente");
            console.log(response.body);
        })
    })


    describe('GET /transfers', () => {
        let token

        beforeEach(async () => {
            token = await obterToken("vitor", "123456");
        })

        it('Deve retornar 200 quando a requisição for válida', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transfers')
                .set('Content-type', 'Application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).to.equal(200);
        });

        it('Deve retornar 401 quando o token for inválido ou não for informado', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transfers')
                .set('Content-type', 'Application/json')
            //.set('Authorization', `Bearer ${token}`)
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal("Token não fornecido.");
            console.log(response.body);
        });
    })
})