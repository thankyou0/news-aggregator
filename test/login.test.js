import express from 'express';
import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import CryptoJS from 'crypto-js';
import jsonwebtoken from 'jsonwebtoken';    
import { logInPost } from '../backend/controllers/cuser.js';
import usermodel from '../backend/models/muser.js';


describe('POST /api/user/login', () => {
  let app;

  before(() => {
    // Set up express app and route
    app = express();
    app.use(express.json());
    app.post('/api/user/login', (req, res) => logInPost(req, res));
  });

  afterEach(() => {
    sinon.restore(); // Restore stubs after each test
  });

  it('should return 210 if any required field is missing', async () => {
    const response = await request(app).post('/api/user/login').send({ email: '', password: '' });

    expect(response.status).to.equal(210);
    expect(response.body.success).to.be.false;
    expect(response.body.message).to.equal('All fields required');
  });

  it('should return 210 if user does not exist', async () => {
    sinon.stub(usermodel, 'findOne').resolves(null); // Simulate user not existing

    const response = await request(app)
      .post('/api/user/login')
      .send({ email: 'nonexistent@example.com', password: 'password123', role: 'Reader' });

    expect(response.status).to.equal(210);
    expect(response.body.success).to.be.false;
    expect(response.body.message).to.equal('User not exist');
  });

  it('should return 210 if the password is invalid', async () => {
    sinon.stub(usermodel, 'findOne').resolves({
      email: 'test@example.com',
      role: 'READ',
      password: CryptoJS.AES.encrypt('realpassword', 'news-aggregator-secret').toString(),
    });

    const response = await request(app)
      .post('/api/user/login')
      .send({ email: 'test@example.com', password: 'wrongpassword', role: 'reader' });

    expect(response.status).to.equal(210);
    expect(response.body.success).to.be.false;
    expect(response.body.message).to.equal('Invalid password');
  });

  it('should return 202 and a token if login is successful', async () => {
    const userData = {
      username: 'Kartavya',
      email: 'abc@xmail.com',
      role: 'READER',
      password: CryptoJS.AES.encrypt('1234567890', 'news-aggregator-secret').toString(),
    };

    sinon.stub(usermodel, 'findOne').resolves(userData);

    const response = await request(app)
      .post('/api/user/login')
      .send({ email: 'abc@xmail.com', password: '1234567890', role: 'READER' });

    expect(response.status).to.equal(202);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal('User signed in successfully');
    expect(response.body.token).to.exist; // Ensure token is present
  });

// it('should return 202 and a token if login is successful', async () => {
//     const userData = {
//       _id: '6739a4d60ebd8d3bacfcfeb7', // Match the MongoDB ID
//       username: 'Kartavya',
//       email: 'abc@xmail.com',
//       role: 'READER',
//       password: '1234567890', // Match the encrypted password in MongoDB
//     };
  
//     // Mock the database call to return the user data
//     sinon.stub(usermodel, 'findOne').resolves(userData);
  
//     const response = await request(app)
//       .post('/api/user/login')
//       .send({ email: 'abc@xmail.com', password: '1234567890', role: 'READER' });
  
//     expect(response.status).to.equal(202);
//     expect(response.body.success).to.be.true;
//     expect(response.body.message).to.equal('User signed in successfully');
//     expect(response.body.token).to.exist; // Ensure token is present
  // });
    
});
