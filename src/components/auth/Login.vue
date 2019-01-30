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
          button#login-submit.button.is-link(
            @click="authenticate",
            :disabled="submitDisabled"
          ) Submit

      Notification(
        v-if="!isNotificationHidden"
        v-on:closed="isNotificationHidden = true"
      )
        p {{ notificationText }}
</template>

<script>
import API from '../../api';
import Cookie from '../../cookies';
import Notification from '../Notification.vue';

export default {
  name: 'Login',
  components: { Notification },
  data() {
    return {
      username: '',
      password: '',
      notificationText: '',
      isNotificationHidden: true,
    };
  },
  computed: {
    submitDisabled() {
      return this.username.length === 0 || this.password.length === 0;
    },
  },
  methods: {
    /**
     * Authenticate the user against the API.
     * Should return an authentication which is stored in Vuex and as a cookie.
     *
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
        this.isNotificationHidden = false;
        switch (e.response.data.code) {
          case 401:
            this.notificationText = 'Username or password is incorrect';
            break;
          default:
            this.notificationText = 'Something went wrong';
            break;
        }
      }

      // Store the cookie
      if (token) {
        Cookie.set(token);
        this.$store.commit('updateToken', token);
        this.$emit('authenticated');
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
