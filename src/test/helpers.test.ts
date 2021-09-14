import chai, { expect } from 'chai';
import { testPassword, userId, userRole, currentPage, resultsPerPage, resultsCount } from './mock';
import { hashPassword, comparePasswords } from '../utils/bcrypt';
import { generateToken, validateToken } from '../utils/tokenHandler';
import { pagination } from '../utils/utils';


describe('Testing password hash functions', () => {
    let hash;

    it('it should return string', () => {
      hash = hashPassword(testPassword);
    
      expect(hash).to.be.a('string')
      expect(hash).to.be.length.at.least(20)
    });

    it('Testing if given pass is equivalent of given hash, should return true', () => {
        let compare = comparePasswords(testPassword, hash);
        
        expect(compare).equal(true)
      });
});


describe('Testing token handler functions', () => {
    let token;

    it('it should return token, which should be string, with size of 179 chars', () => {
        token = generateToken(userId, userRole);
    
        expect(token).to.be.a('string')
        expect(token).to.be.length(179);
    });

    it('It should return token data, passed previously', () => {
        let tokenData = validateToken(token);
        
        let parsedUserId = tokenData.data.id;
        let parsedUserRole = tokenData.data.role;
        
        expect(parsedUserId).equal(userId);
        expect(parsedUserRole).equal(userRole);
      });
});

describe('Testing pagination function', () => {
    it('it should return object with properties following properties: previousPage, currentPage, nextPage, lastPage', () => {
        const pages = pagination(currentPage, resultsPerPage, resultsCount);
    
        expect(pages).to.be.an('object')
        expect(pages).to.have.a.property('previousPage')
        expect(pages).to.have.a.property('currentPage')
        expect(pages).to.have.a.property('nextPage')
        expect(pages).to.have.a.property('lastPage')
    });
});