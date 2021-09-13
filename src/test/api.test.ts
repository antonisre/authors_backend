import server from '../server';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { testUser, updatedEmail, testBook, updatedBookTitle } from './mock';

chai.use(chaiHttp);
let userToken;
let userID;
let currentBookID;

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

describe('POST /user/sigin', () => {
    it('it should check for existing user, return token, have response status 200, be a object', (done) => {
      chai.request(server)
          .post('/user/signin')
          .send({ email: testUser.email, password: testUser.password })
          .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.data.user).to.be.a('object')
                expect(res.body.data.user).to.have.property('token')
            done();
          });
    });
});


describe('PUT /user/:id', () => {
    it('it should return status ok(200, update email to updateEmail value property', (done) => {
      chai.request(server)
          .put(`/user/${userID}`)
          .set('token', userToken)
          .send({ email: updatedEmail })
          .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.data.user).to.be.a('object')
                expect(res.body.data.user).to.have.property('email', updatedEmail)
            done();
          });
    });
});


describe('POST /book', () => {
    it('it should create new book, return status ok(200), authorId should be current user s id', (done) => {
      chai.request(server)
          .post(`/book`)
          .set('token', userToken)
          .send(testBook)
          .end((err, res) => {
                currentBookID = res.body.data.book.id
                expect(res.status).to.equal(200)
                expect(res.body.data.book).to.have.property('authorId', userID)
            done();
          });
    });
});

describe('GET /book/:id', () => {
    it('It should find book by id, return status ok(200), id of the book should be current book id', (done) => {
      chai.request(server)
          .get(`/book/${ currentBookID }`)
          .set('token', userToken)
          .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.data.book[0]).to.have.property('id', currentBookID)
            done();
          });
    });
});

describe('PUT /book/:id', () => {
    it('It should update book by id, return status ok(200), new title should be same as mocked one', (done) => {
      chai.request(server)
          .put(`/book/${ currentBookID }`)
          .set('token', userToken)
          .send({ title: updatedBookTitle })
          .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.data.book).to.have.property('title', updatedBookTitle)
            done();
          });
    });
});


describe('DELETE /book/:id', () => {
    it('It should delete test book, return status ok(200)', (done) => {
      chai.request(server)
          .delete(`/book/${ currentBookID }`)
          .set('token', userToken)
          .end((err, res) => {
                expect(res.status).to.equal(200)
            done();
          });
    });
});

describe('DELETE /user/:id', () => {
    it('it should delete test user and return status ok(200)', (done) => {
      chai.request(server)
          .delete(`/user/${userID}`)
          .set('token', userToken)
          .end((err, res) => {
                expect(res.status).to.equal(200)
            done();
          });
    });
});


