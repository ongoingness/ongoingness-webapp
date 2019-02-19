<template lang="pug">
  div#devices.container
    h1.is-size-3 Your Devices

    h1.is-size-4 Register Device
    p Add a device to display media on below. Add the device's MAC address to the text field.

    h1.is-size-4 All Devices
    p These are all your registered devices. To remove a device press the delete button.
    div.all-devices
      ul.list
        li.list-item(
          v-for="device in devices"
        ) {{ device.mac }}
          a.delete.has-text-right(
            :click="removeDevice(device._id)"
          )
</template>

<script>
export default {
  name: 'Devices',
  data() {
    return {
      devices: [
        { mac: '3325424' },
        { mac: '3325424' },
        { mac: '3325424' },
        { mac: '3325424' },
      ],
    };
  },
  methods: {
    async removeDevice(id) {
      return id;
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
