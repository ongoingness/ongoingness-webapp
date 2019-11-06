<template lang="pug">
  div#app
    Title
    AuthForm(
      v-if="!isLoggedIn"
    )
    
    //NavTabs(
    //  v-if="isLoggedIn",
    //  v-on:on-update="tabUpdate"
    //)
    div(
      v-if="isLoggedIn"
    )
      Media(
        v-if="active.media"
      )
      //Devices(
      //  v-if="active.devices"
      //)
    Notification
    FooterBar
</template>

<script>
import Title from './components/Title.vue';
import AuthForm from './components/AuthForm.vue';
import Cookie from './cookies';
import API from './api';
import Media from './components/Media.vue';
//import NavTabs from './components/NavTabs.vue';
//import Devices from './components/Devices.vue';
import Notification from './components/views/Notification.vue';
import NotificationController from './controllers/notification';
import FooterBar from './components/FooterBar.vue';

export default {
  name: 'app',
  components: {
    FooterBar,
    Notification,
    //Devices,
    //NavTabs,
    Media,
    AuthForm,
    Title,
  },
  data() {
    return {
      active: {
        media: true,
        devices: false,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getToken;
    },
  },
  methods: {
    tabUpdate(tab) {
      Object.keys(this.active).forEach((key) => {
        this.active[key] = false;
      });
      this.active[tab] = true;
    },
  },
  async mounted() {
    // Get the token from cookie if exists and write to store.
    const token = Cookie.get('authToken');
    if (token) {
      this.$store.commit('updateToken', token);

      try {
        const response = await API.getAllMedia(this.$store.getters.getToken);
        this.$store.commit('updateMedia', response);

        const deviceResponse = await API.getDevices(this.$store.getters.getToken);
        this.$store.commit('updateDevices', deviceResponse);

        const tagsResponse = await API.getAllTags(this.$store.getters.getToken);
        this.$store.commit('addTags', tagsResponse);

      } catch (e) {
        console.log(e);
        NotificationController.setNotification('danger', 'Something went wrong');
      }
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
