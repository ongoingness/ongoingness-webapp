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
          button#register-submit.button.is-link(
            @click="registerUser",
            :disabled="isDisabled"
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
  name: 'Register',
  components: { Notification },
  data() {
    return {
      username: '',
      password: '',
      isNotificationHidden: true,
      notificationText: '',
    };
  },
  computed: {
    isDisabled() {
      return this.username.length === 0 || this.password.length === 0;
    },
  },
  methods: {
    /**
     * Register the user.
     * @returns {Promise<void>}
     */
    async registerUser() {
      // Reject if username or password not given
      if (this.username.length === 0 || this.password.length === 0) throw new Error('Username or password cannot be empty.');

      // Try and get the token.
      let token;
      try {
        token = await API.register(this.username, this.password);
      } catch (e) {
        this.isNotificationHidden = false;
        switch (e.response.data.code) {
          case 403:
            this.notificationText = 'Username already exists.';
            break;
          default:
            this.notificationText = 'Something went wrong.';
        }
      }

      // Store the token.
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
