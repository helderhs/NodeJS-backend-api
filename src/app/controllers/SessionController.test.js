/* eslint-disable no-undef */
import app from '../../app';

//const bcrypt = require('bcryptjs');
const request = require('supertest');

const mocks = require('./mocks');

describe('Session usuario', () => {
  it('Logar usuario', async () => {
    const res = await request(app)
      .post('/sessions')
      .send(mocks.loginUsuario);

    mocks.token.token = res.body.token;

    /*const compareHash = await bcrypt.compare(
      mocks.loginUsuario.password,
      res.body.password_hash
    );
    expect(compareHash).toBe(true);*/

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('Pegar Usuarios', async () => {
    const res = await request(app)
      .get('/tarefaPaginacao')
      .set('Authorization', `Bearer ${mocks.token.token}`);

    expect(res.statusCode).toEqual(200);
  });
});
