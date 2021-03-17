<template lang="pug">
  div#title
    section.hero.is-medium.is-light.has-text-centered
      div.hero-head.has-text-right
        div.container
          button.button(
            v-if="isLoggedIn",
            @click="logout"
          ) Logout
          button.button.is-danger.is-outlined(
            v-if="isLoggedIn && (this.canDelete == 'true')"
            @click="deleteAccount"
          ) Delete Account
      div.hero-body
        div.container
          h1.title Ongoingness
          div {{this.title}}
</template>

<script>
import Cookie from '../cookies';
import API from '../api';
import NotificationController from '../controllers/notification';

export default {
  props: ['title', 'canDelete'],
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
        NotificationController.setNotification('danger', 'Something went wrong');
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
  margin-bottom: 0px
}
  .hero-head {
    padding-top: 1%;

    .button {
      margin-left: 5px;
    }
  }
</style>
