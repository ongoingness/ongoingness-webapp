<template lang="pug">
  div#media.container
    h2.is-size-3 Media
    UploadMedia
    h2.is-size-4 Your Media
      h3.is-size-5.media-header Permanent Media
      div.media-collection
        MediaItem.media-item(
          v-for="m in permanentMedia"
          :media="m",
          v-bind:key="m.id",
        )
        
      h3.is-size-5.media-header Temporary Media
      div
        MediaContainer(
          v-for="m in temporaryMedia"
          :dayContent="m",
          v-bind:key="m.id",
        )

</template>

<script>
import MediaItem from './MediaItem.vue';
import UploadMedia from './UploadMedia.vue';
import MediaContainer from './MediaContainer.vue';

export default {
  name: 'Media',
  components: {
    UploadMedia,
    MediaItem,
    MediaContainer,
  },
  computed: {
    /**
     * Get all media marked with a present tag.
     *
     * @returns {*}
     */
    permanentMedia() {
      const permanent = this.$store.getters.getMedia.filter(media => media.locket === 'permanent');
      return permanent.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    },
    /**
     *  Get all media marked with a past tag.
     *
     * @returns {*}
     */
    temporaryMedia() {
      const temporary = this.$store.getters.getMediaByTimeTag;
      return temporary.sort((a, b) => a.date - b.date);
    },

  },
};
</script>

<style scoped lang="scss">
#media {
  margin-bottom: 5%;

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
