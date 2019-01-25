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
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
