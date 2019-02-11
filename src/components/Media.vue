<template lang="pug">
  div#media
    div.container
      div.header
        h1.is-size-3 Media

      div.new-media
        h2.is-size-4 Upload Media
        div.file.is-boxed.file-upload
          label.file-label
            input.file-input(
              type="file",
              name="file",
              v-on:change="handleFileChange"
            )
            span.file-cta
              span.file-icon
                i.fas.fa-upload
              span.file-label.has-text-centered Choose a file
            span.file-name {{ filename }}

        div.control.image-tag-selection
          p Is your image:
          label.radio
            input(
              type="radio",
              name="mtag",
              value="perm",
              v-model="ltag"
            )
            | &nbsp; Permanent
          br
          label.radio
            input(
              type="radio",
              name="mtag",
              value="temp",
              v-model="ltag"
            )
            | &nbsp; Temporary

        button.button.upload-button.is-primary(
          @click="uploadFile",
          :disabled="(file === null)",
          :class="{ 'is-loading': isBusy }"
        ) Upload

        Notification(
          v-if="!isNotificationHidden",
          v-on:closed="isNotificationHidden = true"
        )
          p {{ notificationText }}

      div.all-media
        h2.is-size-3 Your Media

        div(
          v-if="permMedia.length > 0 || tempMedia.length > 0"
        )
          h2.is-size-4 Permanent Media
          div.media-collection
            MediaItem.media-item(
              v-for="m in permMedia"
              :media="m"
            )

          h2.is-size-4 Transient Media
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
import API from '../api';
import Notification from './Notification.vue';
import MediaItem from './MediaItem.vue';

export default {
  name: 'Media',
  components: { MediaItem, Notification },
  data() {
    return {
      file: null,
      era: 'past',
      ltag: 'temp',
      notificationText: '',
      isNotificationHidden: true,
      isBusy: false,
    };
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
    filename() {
      return this.file === null ? 'Your Image' : this.file.name;
    },
  },
  methods: {
    /**
     * Handle a file upload.
     * @returns {Promise<void>}
     */
    async uploadFile() {
      if (this.ltag === '') {
        this.isNotificationHidden = false;
        this.notificationText = 'You must select whether media is permanent or temporary';
        return;
      }
      this.isBusy = true;
      try {
        const response = await API.uploadMedia(
          // set headers
          this.file,
          {
            era: this.era,
            locket: this.ltag,
          },
          this.$store.getters.getToken,
        );
        this.file = null;
        this.$store.commit('addMedia', response);
      } catch (e) {
        this.isNotificationHidden = false;
        this.notificationText = 'Something went wrong';
        this.file = null;
      } finally {
        this.isBusy = false;
      }
    },
    /**
     * Set the file when the file is changed.
     * @param e
     */
    handleFileChange(e) {
      // eslint-disable-next-line prefer-destructuring
      this.file = e.target.files[0];
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

  .image-tag-selection, .upload-button, .file-upload {
    margin-top: 1.25%;
  }

  .upload-button {
    margin-bottom: 1.25%;
  }

  .media-item {
    display: inline-block;
    margin-bottom: 8px;
    width: 100%;
    margin-right: 8px;
  }

  .media-item:nth-of-type(2n) {
    margin-right: 0;
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
    margin-top: 2.5%;
  }
}
</style>
