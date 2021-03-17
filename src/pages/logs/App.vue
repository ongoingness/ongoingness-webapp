<template lang="pug">
  div#app
    Title(title="Logs", canDelete="true")
    AuthForm(
      v-if="!isLoggedIn"
    )
    NavTabs(
      v-if="isLoggedIn",
      v-on:on-update="tabUpdate"
    )
    div(v-if="isLoggedIn && active.logs")
      LogForm
      LogsTable
    div(v-if="isLoggedIn && active.piece")
      PieceEngagement
    Notification
    FooterBar
</template>

<script>
import Title from '../../components/Title.vue';
import AuthForm from '../../components/AuthForm.vue';
import Cookie from '../../cookies';
import API from '../../api';
import NavTabs from './components/NavTabs.vue';
import Notification from '../../components/views/Notification.vue';
import NotificationController from '../../controllers/notification';
import FooterBar from '../../components/FooterBar.vue';
import LogForm from './components/LogForm.vue';
import LogsTable from './components/LogsTable.vue';
import PieceEngagement from './components/PieceEngagement.vue';

export default {
  name: 'app',
  components: {
    FooterBar,
    Notification,
    NavTabs,
    AuthForm,
    Title,
    LogForm,
    LogsTable,
    PieceEngagement,
  },
  data() {
    return {
      active: {
        logs: true,
        piece: false,
        content: false,
        website: false,
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
        const userlogsResponse = await API.getUserLogsAmount(this.$store.getters.getToken);
        this.$store.commit('setUsers', userlogsResponse);

        //WATCH
        this.$store.commit('addLoggingCode', "WAKE_UP");
        this.$store.commit('addLoggingCode', "CONTENT_DISPLAYED");
        this.$store.commit('addLoggingCode', "SLEEP");
        this.$store.commit('addLoggingCode', "ACTIVITY_STARTED");
        this.$store.commit('addLoggingCode', "ACTIVITY_TERMINATED");
        this.$store.commit('addLoggingCode', "CHARGER_CONNECTED");
        this.$store.commit('addLoggingCode', "CHARGER_DISCONNECTED");
        this.$store.commit('addLoggingCode', "PULLED_CONTENT");
        this.$store.commit('addLoggingCode', "PUSHED_LOGS");
        this.$store.commit('addLoggingCode', "NEW_CONTENT_ADDED");
        this.$store.commit('addLoggingCode', "CONTENT_REMOVED");
        this.$store.commit('addLoggingCode', "STARTED_WATCHFACE");
        this.$store.commit('addLoggingCode', "STOPPED_WATCHFACE");

        //SERVER  
        this.$store.commit('addLoggingCode', "REGISTER");
        this.$store.commit('addLoggingCode', "LOGIN");
        this.$store.commit('addLoggingCode', "LOGIN_DEVICE");
        this.$store.commit('addLoggingCode', "NEW_MEDIA");    
        this.$store.commit('addLoggingCode', "DEL_MEDIA");
        this.$store.commit('addLoggingCode', "GET_MEDIA");
        this.$store.commit('addLoggingCode', "GET_INF_MEDIA");
        this.$store.commit('addLoggingCode', "RECEIVED_LOGS");

        this.$store.commit('addLoggingCode', "WEBSITE");
        this.$store.commit('addLoggingCode', "PIECE");
        this.$store.commit('addLoggingCode', "ALL");

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
