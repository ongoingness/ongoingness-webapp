/* eslint-disable no-underscore-dangle */
import { expect, assert } from 'chai';
import API from '../../../src/api';

/**
 Created:  2019-01-28
 Author:   Daniel
 Description:
 -
 */

describe('api.js', () => {
  let authToken;
  const username = 'username';
  const password = 'password';

  describe('Auth', () => {
    it('Should register a user', (done) => {
      API.register(username, password)
        .then((response) => {
          expect(response.token).to.not.equal(null);
          authToken = response.token;
          done();
        });
    });

    it('Should fetch a token and update the store on submit', (done) => {
      API.authenticate(username, password)
        .then((token) => {
          expect(authToken).to.not.equal(null);
          authToken = token;
          done();
        });
    });
  });

  describe('User', () => {
    before(() => {
      if (!authToken) throw new Error('No token provided');
    });

    it('Should get a users information', (done) => {
      API.getUser(authToken)
        .then((userInfo) => {
          expect(userInfo._id).to.not.equal(null);
          done();
        });
    });

    it('Should destroy a users account', (done) => {
      API.deleteAccount(authToken)
        .then((isDeleted) => {
          assert(isDeleted);
          done();
        });
    });
  });

  describe('Media', () => {
    before(() => {
      if (!authToken) throw new Error('Token not provided');
    });

    it('Should fetch all of the users media', (done) => {
      API.getAllMedia(authToken)
        .then((response) => {
          expect(response).not.equal(null);
        });
    });
  });
});
