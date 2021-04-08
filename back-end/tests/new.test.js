const request = require('supertest');
// const app = require('../tests/app');
const express = require('express');
const app = express();
const loginrouter = require('../src/controllers/LoginController')
app.use('/login', loginrouter);

// const app = require('../index');

test('teste testando', async () => {
  
  return request(app)
    .post('/login')
    .send({
      email: 'tryber@trybe.com.br',
      password: '123456',
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      assert(response.data.email, 'tryber@trybe.com.br')
      done();
  })
  .catch(err => console.log(err))

});

// test('teste testando 2', async () => {
  
//   await request(app)
//     .post('/login')
//     .send({
//       email: 'tryber@trybe.com.br',
//       password: '12345',
//     })
//     .expect('Content-Type', /json/)
//     .expect(401)

// });

// test('teste testando 3', async () => {
  
//   await request(app)
//     .post('/user/register')
//     .send({
//       "name": "Rafaedl Pcisasasasaaano",
//       "email": "poncdi@gmil.asssm",
//       "password": "123456sas",
//       "role": "admin"
//     })
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .expect('"poncdi@gmil.asssm"')

// });

// test('teste testando 4', async () => {
  
//   await request(app)
//     .put('/user/update')
//     .send({
//       "name": "oioioisaaaaassa",
//       "email": "tryber@trybe.com.br"
//     })
//     .expect('Content-Type', /json/)
//     .expect(200)

// });