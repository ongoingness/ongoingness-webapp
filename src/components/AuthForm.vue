<template lang="pug">
  div#auth-form
    div.container
      Login(
        v-if="hasAccount",
        v-on:authenticated="onAuthenticated"
      )
      Register(
        v-else,
        v-on:authenticated="onAuthenticated"
      )
      div(
      v-if="hasAccount"
      )
        p.switch Don't have an account?
        |
        a(
        @click="hasAccount = false"
        ) Register
      div(
        v-else
      )
        p.switch Have an account?
        |
        a(
        @click="hasAccount = true"
        ) Sign in
</template>

<script>
import Register from './auth/Register.vue';
import Login from './auth/Login.vue';
import API from '../api';

export default {
  name: 'AuthForm',
  components: { Login, Register },
  data() {
    return {
      hasAccount: true,
    };
  },
  methods: {
    async onAuthenticated() {
      console.log('User is authenticated');

      try {
        const response = await API.getAllMedia(this.$store.getters.getToken);
        this.$store.commit('updateMedia', response.data);
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>

<style scoped>
#auth-form {
  padding-top: 5%;
  padding-bottom: 5%;
}
.switch {
  margin-top: 25px;
}
</style>
