<template lang="pug">
  div#media.container
    h2.is-size-3 Media

    UploadMedia

    h2.is-size-4 Your Tags
     div.hide-buttons
      button.button(
        v-if="showTags"
        @click="submit"
      ) Hide Tags
      button.button(
        v-else
        @click="submit"
      ) Show Tags

    div.media-collection(v-show="showTags")
      TagTime(
        v-for="t in timeTags"
        :tagname="t"
      )
      TagGeneral(
        v-for="t in tags"
        :tagname="t"
      )
      TagPlace(
        v-for="t in placeTags"
        :tagname="t"
      )
      TagPeople(
        v-for="t in peopleTags"
        :tagname="t"
      )

    h2.is-size-4 Your Media
    div.all-media(
      v-if="presentMedia.length > 0 || pastMedia.length > 0"
    )
      h2.is-size-4.media-header Present Media
      p This is your media from the present. Every time a new present media is uploaded, a new set of past media is sent to the piece.
      div.media-collection
        MediaItem.media-item(
          v-for="m in presentMedia"
          :media="m",
          v-bind:key="m.id",
        )

      h2.is-size-4.media-header Past Media
      p This is your media from the past. The Refind will show 5 pieces of media you upload here.
      div.media-collection
        MediaItem.media-item(
          v-for="m in pastMedia"
          :media="m",
          v-bind:key="m.id",
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
import API from '../api';

import TagGeneral from './TagGeneral.vue';
import TagPeople from './TagPeople.vue';
import TagPlace from './TagPlace.vue';
import TagTime from './TagTime.vue';

export default {
  name: 'Media',
  components: { UploadMedia, MediaItem, Notification, TagGeneral, TagPeople, TagPlace, TagTime },
  data () {
    return {
      showTags: false,
    }
  },
  methods: {
    submit() {
      this.showTags = !this.showTags;
    },
  },
  computed: {
    /**
     * Get all media marked with a present tag.
     *
     * @returns {*}
     */
    presentMedia() {
      return this.$store.getters.getMedia.filter(media => media.locket === 'present');
    },
    /**
     *  Get all media marked with a past tag.
     *
     * @returns {*}
     */
    pastMedia() {
      return this.$store.getters.getMedia.filter(media => media.locket === 'past');
    },

    tags() {
      return this.$store.getters.getTags;
    },

    timeTags() {
      return this.$store.getters.getTimeTags;
    },

    placeTags() {
      return this.$store.getters.getPlacesTags;
    },

    peopleTags() {
      return this.$store.getters.getPeopleTags;
    }

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
