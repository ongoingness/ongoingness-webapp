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
  methods: {
    /**
     * Get cookie from browser
     * @param name cookie label
     * @returns {*}
     */
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
