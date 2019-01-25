<template lang="pug">
  div#register
    div.container
      h1.is-size-3 Register
      div.field
        label.label Username
        div.control.has-icons-left.has-icons-right
          input.input(
            type="text",
            placeholder="johnsmith"
            v-model="username"
          )
          span.icon.is-small.is-left
            i.fas.fa-user

      div.field
        label.label Password
        div.control.has-icons-left.has-icons-right
          input.input(
            type="password",
            placeholder="secret",
            v-model="password"
          )
          span.icon.is-small.is-left
            i.fas.fa-lock

      div.field
        div.control
          button.button.is-link(
            @click="registerUser"
          ) Submit

</template>

<script>
import API from '../../api';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    /**
     * Register the user.
     *
     * TODO: Properly catch all the errors.
     * @returns {Promise<void>}
     */
    async registerUser() {
      console.log('Registering user');

      if (this.username.length === 0 || this.password.length === 0) throw new Error('Username or password cannot be empty.');

      let token;
      try {
        token = await API.register(this.username, this.password);
      } catch (e) {
        alert('User could not be registered');
      }

      if (token) {
        this.setCookie(token);
      }

      console.log(token);
    },
    setCookie(value) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);
      document.cookie = `${encodeURIComponent('authToken')}=${`${encodeURIComponent(value)}; expires=${expires}`}`;
    },
  },
};
</script>

<style scoped>
#register {
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
