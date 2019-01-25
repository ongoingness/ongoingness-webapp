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
import Cookie from '../../cookies';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    /**
     * Authenticate the user against the API.
     * Should return an authentication which is stored in Vuex and as a cookie.
     *
     * TODO: Catch 500
     * TODO: Catch 404
     * TODO: Add error messages to page
     * @returns {Promise<void>}
     */
    async authenticate() {
      // Throw an error is username or password is not provided
      if (this.username.length === 0 || this.password.length === 0) throw new Error('Username or password cannot be empty.');

      // Try to get the token
      let token;
      try {
        token = await API.authenticate(this.username, this.password);
      } catch (e) {
        alert('User could not be authenticated');
      }

      // Store the cookie
      if (token) {
        Cookie.set(token);
        this.$store.commit('updateToken', token);
      }
    },
  },
};
</script>

<style scoped>
.is-size-3{
  margin-bottom: 25px;
}
</style>
