<template lang="pug">
  div#media-item
    div
      div
        figure
          img.is-rounded(
            :src="imageUrl"
          )
        br
        div.has-text-centered
          p Added on:
          | {{ media.createdAt }}
</template>

<script>
/* eslint-disable no-underscore-dangle */
import API from '../api';

export default {
  props: ['media'],
  name: 'MediaItem',
  computed: {
    imageUrl() {
      return `${API.URL}/media/${this.media._id}?token=${this.$store.getters.getToken}`;
    },
  },
};
</script>

<style scoped>
  img {
    margin-left: auto;
    margin-right: auto;
    display: block;

    max-height: 128px;
    max-width: 128px;

    border-radius: 50%;
  }
</style>
