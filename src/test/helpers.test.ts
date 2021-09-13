import server from '../server';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { testUser, updatedEmail, testBook, updatedBookTitle } from './mock';

describe('POST /user/signup', () => {
    it('it should create test user and return token, have response status 200, be a object', (done) => {
      chai.request(server)
          .post('/user/signup')
          .send(testUser)
          .end((err, res) => {
                userToken = res.body.data.user.token; //set token for future tests
                userID = res.body.data.user.id;
                expect(res.status).to.equal(200)
                expect(res.body.data.user).to.be.a('object')
                expect(res.body.data.user).to.have.property('token')
            done();
          });
    });
});