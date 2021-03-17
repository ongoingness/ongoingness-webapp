<template lang="pug">
  div#media-item()
    div.actions.has-text-right
      span.icon.action(
        @click="deleteMedia(media._id)"
      )
        i.fas.fa-trash
    figure
      img(
        :src="imageUrl"
      )
    br

</template>

<script>
/* eslint-disable no-underscore-dangle */
import API from '../../../api';
import NotificationController from '../../../controllers/notification';

export default {
  props: ['media'],
  name: 'MediaItem',
  computed: {
    imageUrl() {
      return `${API.URL}/media/${this.media._id}?token=${this.$store.getters.getToken}`;
    },
  },
  methods: {
    async deleteMedia(id) {
      try {
        await API.deleteMedia(id, this.$store.getters.getToken);
      } catch (e) {
        NotificationController.setNotification('danger', 'Could not delete media');
        return;
      }
      this.$store.commit('removeMedia', id);
    },
  },
};
</script>

<style lang="scss" scoped>
  #media-item {
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    padding: 0.75%;
    vertical-align: top;

    img {
      $maxImgSize: 256px;
      margin-left: auto;
      margin-right: auto;
      display: block;

      max-height: $maxImgSize;
      max-width: $maxImgSize;

      height: 100%;
      width: 100%;

      border-radius: 50%;
      margin-top: 2.5%;
    }
  }
</style>
