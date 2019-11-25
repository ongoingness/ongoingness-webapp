<template lang="pug">
  div#media.container(gotData)
    h2.is-size-4.media-header Content Collection
    div.media-collection
        MediaPlaceholder.media-item(
          v-if="showAddPermanent"
          type="permanent"
          index="1"
          :n="placeholderCountPermanent"
          nTotal="7"
        )
        MediaItem.media-item(
          v-for="m in permanentMedia"
          :media="m",
          v-bind:key="m.id",
        )
        MediaPlaceholder.media-item(
          v-if="showAddTemporary"
          type="temporary"
          index="1"
          :n="placeholderCountTemporary"
          nTotal="13"
        )
        MediaItem.media-item(
          v-for="m in temporaryMedia"
          :media="m",
          v-bind:key="m.id",
        )
</template>

<script>
import Notification from './views/Notification.vue';
import MediaItem from './MediaItem.vue';
import UploadMedia from './UploadMedia.vue';

import TagGeneral from './TagGeneral.vue';
import TagPeople from './TagPeople.vue';
import TagPlace from './TagPlace.vue';
import TagTime from './TagTime.vue';
import MediaPlaceholder from './MediaPlaceholder.vue';

export default {
  name: 'Media',
  components: {
    UploadMedia,
    MediaItem,
    Notification,
    TagGeneral,
    TagPeople,
    TagPlace,
    TagTime,
    MediaPlaceholder,
  },
  data() {
    return {
      showTags: false,
    };
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
    permanentMedia() {
      const permanent = this.$store.getters.getMedia.filter(media => media.locket === 'permanent');
      return permanent.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).reverse();
    },
    /**
     *  Get all media marked with a past tag.
     *
     * @returns {*}
     */
    temporaryMedia() {
      const temporary = this.$store.getters.getMedia.filter(media => media.locket === 'temporary');
      return temporary.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).reverse();
    },

    gotData() {
      return this.$store.getters.gotData;
    },

    showAddTemporary() {
      return this.$store.getters.gotData && this.placeholderCountTemporary > 0;
    },

    showAddPermanent() {
      return this.$store.getters.gotData && this.placeholderCountPermanent > 0;
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
    },

    placeholderCountPermanent() {
      return 7 - this.permanentMedia.length;
    },

    placeholderCountTemporary() {
      return 13 - this.temporaryMedia.length;
    },

    countPermanent() {
      if(this.permanentMedia != undefined)
        return this.permanentMedia.length;
      return 0
    },

    countTemporary() {
      if(this.temporaryMedia != undefined)
        return this.temporaryMedia.length;
      return 0;
    },
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
    margin-top: 20px;
    margin-bottom: 50px;
  }

  .media-header {
    margin-top: 2.5%;
    border-bottom-style: inset;
  }
}
@media (max-width: 1080px) {
  #media {
    margin-left: 32px;
    margin-right: 32px;
  }
}

.spin {
    -webkit-animation: spinAround 500ms infinite linear;
    animation: spinAround 500ms infinite linear;
}

</style>
