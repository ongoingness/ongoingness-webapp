<template lang="pug">
  div#auth-form
    div.container
      Login(
        v-on:authenticated="onAuthenticated"
      )
</template>

<script>
import Login from './auth/Login.vue';
import API from '../api';
import NotificationController from '../controllers/notification';

export default {
  name: 'AuthForm',
  components: { Login },
  methods: {
    async onAuthenticated() {
      try {
        let response = await API.getAllMedia(this.$store.getters.getToken);
        this.$store.commit('updateMedia', response);

        response = await API.getDevices(this.$store.getters.getToken);
        this.$store.commit('updateDevices', response);
      } catch (e) {
        NotificationController.setNotification('danger', 'Something went wrong');
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
</style>
