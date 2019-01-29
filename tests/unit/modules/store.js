/* eslint-disable */
/**
 Created:  2019-01-29
 Author:   Daniel
 Description:
 -
 */

import { expect } from 'chai';
import store from '../../../src/store';

describe('Store.js', () => {
  describe('Auth', () => {
    it('Should update the token', () => {
      store.commit('updateToken', 'token123');
      expect(store.getters.getToken).to.equal('token123');
    });

    it('Should get the token', () => {
      expect(store.getters.getToken).to.equal('token123');
    });
  });

  describe('Media', () => {
    it('Should set the media', () => {
      store.commit('updateMedia', [
        {
          _id: '1'
        },
        {
          _id: '2'
        }
      ]);
      expect(store.getters.getMedia.length).to.equal(2);
    });

    it('Should get the media', () => {
      expect(store.getters.getMedia.length).to.equal(2);
    });

    it('Should get media by id', () => {
      store.commit('updateMedia', [
        {
          _id: '1'
        },
        {
          _id: '2'
        }
      ]);
      expect(store.getters.getMediaById('1')._id).to.equal('1');
    });

    it('Should delete media from store', () => {
      store.commit('removeMedia', '2');
      expect(store.getters.getMediaById('2')).to.equal(undefined);
    });

    it('Should add a single item of media', () => {
      store.commit('addMedia', { _id: '3' });
      expect(store.getters.getMediaById('3')._id).to.equal('3');
    });
  });
});
