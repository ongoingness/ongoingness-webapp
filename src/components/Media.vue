<template lang="pug">
  div#media
    div.container
      ul.all-media
        li(
          v-for="m in meida"
        ) {{ m._id }}
</template>

<script>
export default {
  name: 'Media',
  computed: {
    media() {
      return this.$store.getters.getMedia;
    },
  },
};
</script>

<style scoped>

</style>
