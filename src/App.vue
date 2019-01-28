<template lang="pug">
  div#app
    Title
    AuthForm(
      v-if="!isLoggedIn"
    )
</template>

<script>
import Title from './components/Title.vue';
import AuthForm from './components/AuthForm.vue';
import Cookie from './cookies';

export default {
  name: 'app',
  components: {
    AuthForm,
    Title,
  },
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getToken;
    },
  },
  methods: {},
  mounted() {
    // Get the token from cookie if exists and write to store.
    const token = Cookie.get('authToken');
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
