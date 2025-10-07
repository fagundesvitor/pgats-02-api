const request = require('supertest');
const postLogin = require('../fixtures/postLogin.json')
require('dotenv').config();

const obterToken = async (usuario, senha) => {
    const bodyLogin = { ...postLogin.sucesso }
    const response = await request(process.env.BASE_URL_REST)
        .post('/users/login')
        .set('Content-type', 'Application/json')
        .send(bodyLogin)
    return response.body.token;
}

module.exports = {
    obterToken
}