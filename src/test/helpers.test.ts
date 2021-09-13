import chai, { expect } from 'chai';
import { testPassword, userId, userRole } from './mock';
import { hashPassword, comparePasswords } from '../utils/bcrypt';
import { generateToken, validateToken } from '../utils/tokenHandler';


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