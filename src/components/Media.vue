<template lang="pug">
  div#media.container
    h2.is-size-3 Media

    UploadMedia

    h2.is-size-4 Your Media
    div.all-media(
      v-if="permMedia.length > 0 || tempMedia.length > 0"
    )
      h2.is-size-4.media-header Permanent Media
      p This is your permanent media, and will always stay on the locket.
      div.media-collection
        MediaItem.media-item(
          v-for="m in permMedia"
          :media="m"
        )

      h2.is-size-4.media-header Transient Media
      p This is your transient media, the locket will update to show new images you upload here.
      div.media-collection
         MediaItem.media-item(
          v-for="m in tempMedia"
          :media="m"
        )
    div(
      v-else
    )
      p You have not uploaded any media.
</template>

<script>
import Notification from './views/Notification.vue';
import MediaItem from './MediaItem.vue';
import UploadMedia from './UploadMedia.vue';

export default {
  name: 'Media',
  components: { UploadMedia, MediaItem, Notification },
  data() {
    return {};
  },
  computed: {
    /**
     * Get all media marked with a temporary tag.
     *
     * @returns {*}
     */
    tempMedia() {
      return this.$store.getters.getMedia.filter(media => media.locket === 'temp');
    },
    /**
     * Get all permanent media.
     *
     * @returns {*}
     */
    permMedia() {
      return this.$store.getters.getMedia.filter(media => media.locket === 'perm');
    },
  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
#media {
  margin-bottom: 5%;

  .all-media {
    margin-top: 2.5%;
  }

  .is-size-3 {
    margin-top: 1.25%;
  }

  .is-size-4 {
    margin-top: 1.25%;
  }

  .media-item {
    display: inline-block;
    margin-bottom: 8px;
    width: 100%;
    margin-right: 8px;
  }

  @media screen and (min-width: 800px) {
    .media-item {
      width: calc(25% - 6px);
    }

    .media-item:nth-of-type(2n) {
      margin-right: 6px;
    }

    .media-item:nth-of-type(4n) {
      margin-right: 0;
    }
  }

  .media-collection {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    margin-top: 2.5%;
  }

  .media-header {
    margin-top: 2.5%;
  }
}
@media (max-width: 1080px) {
  #media {
    margin-left: 32px;
    margin-right: 32px;
  }
}
</style>
