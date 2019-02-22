<template lang="pug">
  div#devices.container
    h1.is-size-3 Your Devices

    h1.is-size-4 Register Device
    p Add a device to display media on below. Add the device's MAC address to the text field.
    div
      InputBar(
        :iconGroup="'fas'",
        :icon="'fa-plus'",
        :placeholder="'Device code'",
        v-on:on-submit="addDevice"
      )

    h1.is-size-4 All Devices
    p These are all your registered devices. To remove a device press the delete button.
    div.all-devices
      ul.list
        li.list-item(
          v-for="device in getDevices"
        ) {{ device.mac }}
          a.delete.has-text-right(
            @click="deleteDevice(device._id)"
          )
</template>

<script>
import InputBar from './views/InputBar.vue';
import API from '../api';
import Notification from './views/Notification.vue';
import NotificationController from '../controllers/notification';

export default {
  name: 'Devices',
  components: { Notification, InputBar },
  data() {
    return {
      deviceId: '',
    };
  },
  methods: {
    async deleteDevice(id) {
      console.log('deleting device');
      try {
        await API.deleteDevice(id, this.$store.getters.getToken);
        this.$store.commit('removeDevice', id);
      } catch (e) {
        NotificationController.setNotification('danger', 'Device could not be deleted');
      }
    },
    async addDevice(code) {
      const exists = this.$store.getters.getDevices.findIndex(d => d.mac === code) > -1;
      if (exists) {
        NotificationController.setNotification('warning', 'Device already exists');
        return;
      }

      let device;
      try {
        device = await API.addDevice(code, this.$store.getters.getToken);
        this.$store.commit('addDevice', device);
      } catch (e) {
        NotificationController.setNotification('danger', 'Device could not be added');
      }
    },
  },
  computed: {
    getDevices() {
      return this.$store.getters.getDevices;
    },
  },
};
</script>

<style lang="scss" scoped>
  #devices {
    margin-left: 32px;
    margin-right: 32px;
    margin-bottom: 5%;
  }

  .is-size-3 {
    margin-top: 1.25%;
  }

  .is-size-4 {
    margin-top: 1.25%;
  }

  .delete {
    float: right;
  }

  .list {
    margin-top: 0.75%;

    .list-item {
      transition: all ease 0.25s;
    }

    .list-item:hover {
      font-weight: bold;
      padding-left: 1.5%;
    }
  }
</style>
