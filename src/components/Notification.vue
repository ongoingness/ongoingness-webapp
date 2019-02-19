<template lang="pug">
  div#notification
    div.notification.is-danger
      button.delete(
        @click="emitClose"
      )
      slot
</template>

<script>
export default {
  name: 'Notification',
  methods: {
    emitClose() {
      this.$emit('closed');
    },
  },
};
</script>

<style scoped>

</style>
