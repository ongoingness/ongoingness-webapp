<template lang="pug">
  div#title
    section.hero.is-large.is-light.has-text-centered
      div.hero-head.has-text-right
        div.container
          button.button(
            v-if="isLoggedIn",
            @click="logout"
          ) Logout
          button.button.is-danger(
            v-if="isLoggedIn"
            @click="deleteAccount"
          ) Delete Account
      div.hero-body
        div.container
          h1.title Ongoingness
</template>

<script>
import Cookie from '../cookies';
import API from '../api';

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
      Cookie.delete();
    },
    async deleteAccount() {
      // eslint-disable-next-line no-alert
      const confirmed = window.confirm('Are you sure? your data cannot be recovered');
      if (!confirmed) return;

      try {
        await API.deleteAccount(this.$store.getters.getToken);
        this.$store.commit('updateToken', null);
        Cookie.delete();
      } catch (e) {
        console.log(e);
        // TODO: Update UI
      }
    },
  },
};
</script>

<style scoped lang="scss">
h1.title {
  text-transform: uppercase;
  letter-spacing: 4px;
  text-align: center;
}
  .hero-head {
    padding-top: 1%;

    .button {
      margin-left: 5px;
    }
  }
</style>
