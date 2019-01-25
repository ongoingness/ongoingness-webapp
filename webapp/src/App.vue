<template lang="pug">
  div#app
    Title
    Register
    Login
</template>

<script>
import Title from './components/Title.vue';
import Register from './components/auth/Register.vue';
import Login from './components/auth/Login.vue';

export default {
  name: 'app',
  components: {
    Login,
    Register,
    Title,
  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
      return null;
    },
  },
  mounted() {
    // Get the token from cookie if exists and write to store.
    const token = this.getCookie('authToken');
    if (token) {
      this.$store.commit('updateToken', token);
    }
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
