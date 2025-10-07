const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao.js')
const postTransfers = require('../fixtures/postTransfers.json')

describe('Transfers', () => {

    let token

    beforeEach(async () => {
        token = await obterToken("vitor", "123456");
    })

    describe('POST /transfers', () => {

        it('Deve retornar 201 quando o valor da transferencia for válido', async () => {
            const bodyTransfers = { ...postTransfers };
            const response = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Content-type', 'Application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers.sucesso);
            expect(response.status).to.equal(201);
            console.log(response.body);
        });

        it('Deve retornar 400 quando a transerência for acima de 5000,00 para não favorecidos', async () => {
            const bodyTransfers = { ...postTransfers };
            const response = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Content-type', 'Application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers['acima-5000-nao-favorecido']);
            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal("Transferência acima de R$ 5.000,00 só para favorecidos");
            console.log(response.body);
        });

        it('Deve retornar 201 quando a transerência for acima de 5000,00 para favorecidos', async () => {
            const bodyTransfers = { ...postTransfers };
            const response = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Content-type', 'Application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers['acima-5000-favorecido']);
            expect(response.status).to.equal(201);
            console.log(response.body);
        });

        it('Deve retornar 400 quando o destinatário for inexistente', async () => {
            const bodyTransfers = { ...postTransfers }
            const response = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Content-type', 'Application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers['destinatario-inexistente']);
            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal("Usuário remetente ou destinatário não encontrado");
        });

        it('Deve retornar 400 quando o remetente for inexistente', async () => {
            const bodyTransfers = { ...postTransfers }
            const response = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Content-type', 'Application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers['remetente-inexistente']);
            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal("Usuário remetente ou destinatário não encontrado");
        });

        it('Deve retornar 401 quando o token for inválido ou não for informado', async () => {
            const bodyTransfers = { ...postTransfers }
            const response = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Content-type', 'Application/json')
                //.set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers.sucesso);
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal("Token não fornecido.");
            console.log(response.body);
        });

        it('Deve retornar 400 quando não tem saldo suficiente', async () => {
            const bodyTransfers = { ...postTransfers }
            const response = await request(process.env.BASE_URL_REST)
                .post('/transfers')
                .set('Content-type', 'Application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers['saldo-insuficiente']);
            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal("Saldo insuficiente");
            console.log(response.body);
        })
    })

    describe('GET /transfers', () => {

        it('Deve retornar 200 quando a requisição for válida', async () => {
            const response = await request(process.env.BASE_URL_REST)
                .get('/transfers')
                .set('Authorization', `Bearer ${token}`)
            expect(response.status).to.equal(200);
        });

        it('Deve retornar 401 quando o token for inválido ou não for informado', async () => {
            const response = await request(process.env.BASE_URL_REST)
                .get('/transfers')
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal("Token não fornecido.");
            console.log(response.body);
        });
    })
})