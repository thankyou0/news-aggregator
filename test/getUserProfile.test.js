import { expect } from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';
import usermodel from '../backend/models/muser.js'; // Adjust path to your user model


describe('GET /user/profile', () => {
  let app;
  let findByIdStub;

  beforeEach(() => {
    // Stub the findById method of the user model
    findByIdStub = sinon.stub(usermodel, 'findById');
  });

  afterEach(() => {
    // Restore the original method after each test
    findByIdStub.restore();
  });

  it('should return the user profile without password when the user exists', async () => {
    // Fake user data
    const fakeUser = {
      _id: '123456',
      username: 'testuser',
      email: 'testuser@example.com',
      role: 'READER',
    };

    // Stub the findById to return the fake user
    findByIdStub.resolves(fakeUser);

    const res = await supertest(app)
      .get('/user/profile')
      .set('Authorization', 'Bearer fakeToken'); // Mock the Authorization header

    expect(res.status).to.equal(202);
    expect(res.body.success).to.be.true;
    expect(res.body.user).to.have.property('username', 'testuser');
    expect(res.body.user).to.have.property('email', 'testuser@example.com');
    expect(res.body.user).to.not.have.property('password');
  });

  it('should return 404 if the user is not found', async () => {
    // Stub the findById to return null
    findByIdStub.resolves(null);

    const res = await supertest(app)
      .get('/user/profile')
      .set('Authorization', 'Bearer fakeToken');

    expect(res.status).to.equal(404); // Assuming your logic is updated to handle 404
    expect(res.body.success).to.be.false;
    expect(res.body.message).to.equal('User not found');
  });

  it('should handle server errors gracefully', async () => {
    // Stub the findById to throw an error
    findByIdStub.rejects(new Error('Database error'));

    const res = await supertest(app)
      .get('/user/profile')
      .set('Authorization', 'Bearer fakeToken');

    expect(res.status).to.equal(500); // Assuming your logic handles errors with a 500 status
    expect(res.body.success).to.be.false;
    expect(res.body.message).to.equal('Server error');
  });
});
