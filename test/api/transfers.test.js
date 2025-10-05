const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao.js')
const postTransfers = require('../fixtures/postTransfers.json')

describe('Transfers', () => {
    describe('POST /transfers', () => {
        let token

        beforeEach(async () => {
            token = await obterToken(vitor, 123456);
        })

        it('Deve retornar sucesso com 201 quando o valor da transferencia for válido', async () => {
            const bodyTransfers = { ...postTransfers }
            const response = await request(process.env.BASE_URL)
                .post('transfers')
                .set('Content-type', 'Applicati{on/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers)
            expect(response.status).to.equal(201);
            console.log(response.body);
        })
        it('Deve retornar 400 quando o destinatário for inexistente', async () => {
            const bodyTransfers = { ...postTransfers }
            const response = await request(process.env.BASE_URL)
                .post('transfers')
                .set('Content-type', 'Applicati{on/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers)
            expect(response.status).to.equal(400);
            console.log(response.body);
        })
        it('Deve retornar 400 quando o remetente for inexistente', async () => {
            const bodyTransfers = { ...postTransfers }
            const response = await request(process.env.BASE_URL)
                .post('transfers')
                .set('Content-type', 'Applicati{on/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransfers)
            expect(response.status).to.equal(400);
            console.log(response.body);
        })



    })

})