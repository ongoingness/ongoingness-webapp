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
    div.has-text-centered
      div.date.is-size-6
        p Added on:
        | {{ formattedDate }}
</template>

<script>
/* eslint-disable no-underscore-dangle */
import API from '../api';
import NotificationController from '../controllers/notification';
import Tag from './Tag.vue';

export default {
  props: ['media'],
  name: 'MediaItem',
  components: { Tag },
  computed: {
    imageUrl() {
      return `${API.URL}/media/${this.media._id}?token=${this.$store.getters.getToken}`;
    },
    formattedDate() {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      const today = new Date(this.media.createdAt);
      return today.toLocaleDateString(options);
    },
    tags() {
      return this.media.emotions;
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
    tagKey(tag) {
      return `${this.media._id}-${tag}`;
    },
  },
};
</script>

<style lang="scss" scoped>
  .tag-container {
    padding: 10px;
  }

  .tag-list {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

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
