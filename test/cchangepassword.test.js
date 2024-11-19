import { expect } from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';
import usermodel from '../backend/models/muser.js'; // Adjust path based on your user model


describe('POST /user/change-password', () => {
  let findByIdStub;
  let saveStub;
  let app;

  beforeEach(() => {
    // Stub the findById method
    findByIdStub = sinon.stub(usermodel, 'findById');
    // Stub the save method
    saveStub = sinon.stub(usermodel.prototype, 'save');
  });

  afterEach(() => {
    // Restore all stubs
    findByIdStub.restore();
    saveStub.restore();
  });

  it('should reset the password successfully if current password matches', async () => {
    const fakeUser = {
      _id: '123456',
      password: CryptoJS.AES.encrypt('oldPassword', 'news-aggregator-secret').toString(),
      save: saveStub,
    };

    // Stub the database call to return the fake user
    findByIdStub.resolves(fakeUser);

    const res = await supertest(app)
      .post('/user/change-password') // Adjust route if needed
      .send({
        CurrentPassword: CryptoJS.AES.encrypt('oldPassword', 'news-aggregator-secret').toString(),
        password: CryptoJS.AES.encrypt('newPassword', 'news-aggregator-secret').toString(),
      })
      .set('Authorization', 'Bearer fakeToken'); // Mock the Authorization header

    expect(res.status).to.equal(202);
    expect(res.body.success).to.be.true;
    expect(res.body.message).to.equal('Password reset successfully');
    expect(saveStub.calledOnce).to.be.true; // Ensure save was called
  });

  it('should return an error if the user does not exist', async () => {
    // Stub the database call to return null
    findByIdStub.resolves(null);

    const res = await supertest(app)
      .post('/user/change-password')
      .send({
        CurrentPassword: CryptoJS.AES.encrypt('oldPassword', 'news-aggregator-secret').toString(),
        password: CryptoJS.AES.encrypt('newPassword', 'news-aggregator-secret').toString(),
      })
      .set('Authorization', 'Bearer fakeToken');

    expect(res.status).to.equal(210);
    expect(res.body.success).to.be.false;
    expect(res.body.message).to.equal("User associated with this email doesn't exist");
  });

  it('should return an error if the current password is incorrect', async () => {
    const fakeUser = {
      _id: '123456',
      password: CryptoJS.AES.encrypt('correctPassword', 'news-aggregator-secret').toString(),
      save: saveStub,
    };

    // Stub the database call to return the fake user
    findByIdStub.resolves(fakeUser);

    const res = await supertest(app)
      .post('/user/change-password')
      .send({
        CurrentPassword: CryptoJS.AES.encrypt('wrongPassword', 'news-aggregator-secret').toString(),
        password: CryptoJS.AES.encrypt('newPassword', 'news-aggregator-secret').toString(),
      })
      .set('Authorization', 'Bearer fakeToken');

    expect(res.status).to.equal(210);
    expect(res.body.success).to.be.false;
    expect(res.body.message).to.equal('Enter Correct password');
  });

  it('should handle server errors gracefully', async () => {
    // Stub the findById method to throw an error
    findByIdStub.rejects(new Error('Database error'));

    const res = await supertest(app)
      .post('/user/change-password')
      .send({
        CurrentPassword: CryptoJS.AES.encrypt('oldPassword', 'news-aggregator-secret').toString(),
        password: CryptoJS.AES.encrypt('newPassword', 'news-aggregator-secret').toString(),
      })
      .set('Authorization', 'Bearer fakeToken');

    expect(res.status).to.equal(500); // Assuming your app handles errors with 500 status
    expect(res.body.success).to.be.false;
    expect(res.body.message).to.equal('Server error');
  });
});
