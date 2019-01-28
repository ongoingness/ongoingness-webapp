/* eslint-disable global-require */
import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import Login from '../../../src/components/auth/Login.vue';
import Register from '../../../src/components/auth/Register.vue';

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

    it('Should disable submit if no password or username present', () => {
      const wrapper = mount(Login);
      const submit = wrapper.find('#login-submit');

      expect(submit.html()).contains('disabled');
    });

    it('Should enable submit button if username and password present', () => {
      const wrapper = mount(Login);
      wrapper.setData({
        username: 'test',
        password: 'secret',
      });

      const submit = wrapper.find('#login-submit');

      expect(submit.html()).not.contains('disabled');
    });
  });

  describe('Register.vue', () => {
    it('Should initialise the component with empty credentials', () => {
      const data = Register.data();
      expect(data.username).to.equal('');
      expect(data.password).to.equal('');
    });

    it('Should throw an error when form submitted with empty credentials', (done) => {
      const wrapper = mount(Register);
      const submit = wrapper.find('#register-submit');

      try {
        submit.trigger('click');
      } catch (e) {
        expect(e.message).contains('cannot be empty');
      } finally {
        done();
      }
    });

    it('Should disable submit if no password or username present', () => {
      const wrapper = mount(Register);
      const submit = wrapper.find('#register-submit');

      expect(submit.html()).contains('disabled');
    });

    it('Should enable submit button if username and password present', () => {
      const wrapper = mount(Register);
      wrapper.setData({
        username: 'test',
        password: 'secret',
      });

      const submit = wrapper.find('#register-submit');

      expect(submit.html()).not.contains('disabled');
    });
  });
});
