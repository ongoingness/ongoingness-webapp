<template lang="pug">
  div#title
    section.hero.is-fullheight.is-light.has-text-centered
      div.hero-head.has-text-right
        div.container
          button.button(
            v-if="isLoggedIn",
            @click="logout"
          ) Logout
      div.hero-body
        div.container
          h1.title Ongoingness
          h2.subtitle Coming soon...
</template>

<script>
export default {
  name: 'Title',
  computed: {
    isLoggedIn() {
      return this.$store.getters.getToken;
    },
  },
  methods: {
    /**
     * Delete cookie and token in Vuex store.
     */
    logout() {
      this.$store.commit('updateToken', null);
      this.deleteCookie();
    },
    /**
     * Delete authToken cookie from browser
     */
    deleteCookie() {
      document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
  },
};
</script>

<style scoped>
h1.title {
  text-transform: uppercase;
  letter-spacing: 4px;
  text-align: center;
}
  .hero-head {
    padding-top: 1%;
  }
</style>
