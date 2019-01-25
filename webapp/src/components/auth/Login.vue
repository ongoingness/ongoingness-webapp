<template lang="pug">
  div#login
    div.container
      h1.is-size-3 Login
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
          @click="authenticate"
          ) Submit
</template>

<script>
import API from '../../api';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async authenticate() {
      console.log('authenticating user');

      if (this.username.length === 0 || this.password.length === 0) throw new Error('Username or password cannot be empty.');

      let token;
      try {
        token = await API.authenticate(this.username, this.password);
      } catch (e) {
        alert('User could not be authenticated');
      }

      if (token) {
        this.setCookie(token);
        this.$store.commit('updateToken', token);
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

</style>
