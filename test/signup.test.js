import express from 'express';
import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import jsonwebtoken from 'jsonwebtoken';
import { signUpPost } from '../backend/controllers/cuser.js';
import usermodel from '../backend/models/muser.js';
import quickSearch_model from '../backend/models/mquicksearch.js';
import verificationcodemodel from '../backend/models/mverificationcode.js';
import { v2 as cloudinary_v2 } from 'cloudinary';

describe('POST /api/user/signup', () => {
  let app;

  before(() => {
    // Set up the Express app and route
    app = express();
    app.use(express.json());
    app.post('/api/user/signup', (req, res) => signUpPost(req, res));
  });

  afterEach(() => {
    sinon.restore(); // Restore stubs after each test
  });

  it('should return 210 if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/user/signup')
      .send({ username: '', email: '', password: '', role: '' });

    expect(response.status).to.equal(210);
    expect(response.body.success).to.be.false;
    expect(response.body.message).to.equal('Please fill all the fields');
  });

  it('should return 210 if user already exists for the given role', async () => {
    sinon.stub(usermodel, 'findOne').resolves({ email: 'test@example.com', role: 'READER' });

    const response = await request(app)
      .post('/api/user/signup')
      .send({ username: 'TestUser', email: 'test@example.com', password: 'password123', role: 'READER' });

    expect(response.status).to.equal(210);
    expect(response.body.success).to.be.false;
    expect(response.body.error).to.equal('User already exists for given role');
  });

  it('should return 202 and token if signup is successful for a READER', async () => {
    const token = 'mockToken';
    sinon.stub(usermodel, 'findOne').resolves(null); // No existing user
    sinon.stub(usermodel.prototype, 'save').resolves();
    sinon.stub(quickSearch_model.prototype, 'save').resolves();
    sinon.stub(verificationcodemodel.prototype, 'save').resolves();
    sinon.stub(jsonwebtoken, 'sign').returns(token);

    const response = await request(app)
      .post('/api/user/signup')
      .send({ username: 'Kartavya', email: 'abc@xmail.com', password: '123456', role: 'READER' });

    expect(response.status).to.equal(202);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal('user registered successfully');
    expect(response.body.token).to.equal(token);
  });

  it('should return 202 and token if signup is successful for a PROVIDER', async () => {
    const token = 'mockToken';
    sinon.stub(usermodel, 'findOne').resolves(null); // No existing user
    sinon.stub(usermodel.prototype, 'save').resolves();
    sinon.stub(verificationcodemodel.prototype, 'save').resolves();
    sinon.stub(jsonwebtoken, 'sign').returns(token);
    sinon.stub(cloudinary_v2.uploader, 'upload').resolves({ secure_url: 'mockCloudinaryUrl' });

    const response = await request(app)
      .post('/api/user/signup')
      .field('username', 'ProviderUser')
      .field('email', 'provider@example.com')
      .field('password', 'provider123')
      .field('role', 'PROVIDER')
      .attach('file', './path/to/mockfile.jpg'); // Simulate file upload

    expect(response.status).to.equal(202);
    expect(response.body.success).to.be.true;
    expect(response.body.message).to.equal('user registered successfully');
    expect(response.body.token).to.equal(token);
  });

  it('should return 210 if there is an error in signup', async () => {
    sinon.stub(usermodel, 'findOne').throws(new Error('Database error'));

    const response = await request(app)
      .post('/api/user/signup')
      .send({ username: 'ErrorUser', email: 'error@example.com', password: 'password123', role: 'READER' });

    expect(response.status).to.equal(210);
    expect(response.body.success).to.be.false;
    expect(response.body.message).to.equal('Error in signup');
  });
});
