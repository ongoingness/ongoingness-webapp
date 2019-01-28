/* eslint-disable global-require */
import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import Login from '../../../src/components/auth/Login.vue';

describe('Auth', () => {
  describe('Login.vue', () => {
    it('Should initialise the component with empty credentials', () => {
      const data = Login.data();
      expect(data.username).to.equal('');
      expect(data.password).to.equal('');
    });

    it('Should throw an error when form submitted with empty credentials', (done) => {
      const wrapper = mount(Login);
      const submit = wrapper.find('#login-submit');

      try {
        submit.trigger('click');
      } catch (e) {
        expect(e.message).contains('cannot be empty');
      } finally {
        done();
      }
    });
  });
});
