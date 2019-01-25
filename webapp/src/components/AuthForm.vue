<template lang="pug">
  div#auth-form
    div.container
      Login(
        v-if="hasAccount"
      )
      Register(
        v-else
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

export default {
  name: 'AuthForm',
  components: { Login, Register },
  data() {
    return {
      hasAccount: true,
    };
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
