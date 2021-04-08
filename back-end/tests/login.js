// const frisby = require('frisby');
const request = require('supertest');
const mysql = require('mysql2/promise');

const LoginRouter = require('../src/controllers/LoginController');


const connection = mysql.createPool({
  user: 'root',
  password: '1234',
  host: 'localhost',
  database: 'Trybeer',
});

describe('Testando rotas.', () => {

  beforeEach(async () => {
    await connection.execute('DROP DATABASE IF EXISTS Trybeer');
    await connection.execute('CREATE DATABASE IF NOT EXISTS Trybeer');
    await connection.execute(`
      CREATE TABLE Trybeer.users (
      id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(20) NOT NULL,
        role VARCHAR(20) NOT NULL,
        PRIMARY KEY (id)
      );`);

    await connection.execute('INSERT INTO Trybeer.users (name, email, password, role) VALUES (?, ?, ?, ?)', ['rafael ponci', 'tryber@trybe.com.br', '123456', 'client']);
    // await connection.end();
  });

  it('Testando a rota LOGIN para logon.', async () => {

    request(LoginRouter)
    .post('/login')
    .send({
      email: 'tryber@trybe.com.br',
      password: '123456',
    })
    .expect('Content-type', /json/)
    .expect({name: 'rafael ponci'})
    .expect({email: 'tryber@trybe.com.br'})
    .expect(200)

    

    // await frisby.post('http://localhost:3001/login', {
    //   email: 'rafael@gmail.com',
    //   password: '123456',
    // }).expect('status', 200).then((response) => {
    //   const { body } = response;
    //   const result = JSON.parse(body);
    //   expect(result.email).toBe('rafael@gmail.com');
    //   expect(result.name).toBe('rafael ponci');
    //   expect(result.role).toBe('client');
    // });
  });

  it('Testando a rota LOGIN para falha.', async () => {

    request(LoginRouter)
    .post('/login')
    .send({
      email: 'tryber@trybe.com.br',
      password: '123456',
    })
    .expect('Content-type', /json/)
    .expect({message: "Login ou Senha Invalidos"})
    .expect(401)
  });

});