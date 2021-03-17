<template lang="pug">
  div#upload-media
    h2.is-size-4 Upload Media
    div.hide-buttons
      button.button(
        v-if="isHidden"
        @click="submit"
      ) Add Media
      button.button(
        v-else
        @click="submit"
      ) Close

    div(
      v-show="!isHidden"
    )

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
        p Which collection should this media be added to?
        label.radio
          input(
          type="radio",
          :disabled="placeholderCountPermanent == 0",
          name="mtag",
          value="permanent",
          v-model="ltag"
          )
          | &nbsp; Permanent Collection
        
        br
        label.radio
          input(
          type="radio",
          name="mtag",
          :disabled="placeholderCountTemporary == 0",
          value="temporary",
          v-model="ltag"
          )
          | &nbsp; Temporary Collection
      
      div
      button.button.upload-button.is-primary(
      @click="uploadFile",
      :disabled="(file === null || file === undefined || ltag === 'unset')",
      :class="{ 'is-loading': isBusy }"
      ) Upload
</template>

<script>
import API from '../../../api';
import NotificationController from '../../../controllers/notification';

export default {
  name: 'UploadMedia',
  props: ['selectedMedia'],
  data() {
    return {
      file: null,
      era: 'past',
      ltag: 'unset',
      isBusy: false,
      isHidden: true,
      emotions: [],
      lcontent: 'file',
      value: [],
      options: [],
      linkedMedia: [],
    };
  },
  methods: {

    submit() {
      this.isHidden = !this.isHidden;
    },

    /**
     * Handle a file upload.
     * @returns {Promise<void>}
     */
    async uploadFile() {
      if (this.ltag === '') {
        NotificationController.setNotification('warning', 'You must select whether media is permanent or temporary');
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
            emotions:'',
            links: '',
          },
          this.$store.getters.getToken,
        );
        this.file = null;
        this.$store.commit('addMedia', response);
      } catch (e) {
        NotificationController.setNotification('danger', 'Something went wrong');
        this.file = null;
      } finally {
        this.isBusy = false;
        this.options = [];
        this.value = [];
        this.ltag = 'unset'
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
  computed: {
    filename() {
      return this.file === null || this.file === undefined ? 'Your media' : this.file.name;
    },
    /**
     * Get all media marked with a present tag.
     *
     * @returns {*}
     */
    presentMedia() {
      return this.$store.getters.getMedia.filter(media => media.locket === 'permanent');
    },
    /**
     *  Get all media marked with a past tag.
     *
     * @returns {*}
     */
    pastMedia() {
      return this.$store.getters.getMedia.filter(media => media.locket === 'temporary');
    },
    /**
     * Change value here to alter max number of 'permanent' media that can be uploaded.
     */
    placeholderCountPermanent() {
      return 7 - this.presentMedia.length;
    },
    /**
     * Change value here to alter max number of 'temporary' media that can be uploaded.
     */
    placeholderCountTemporary() {
      return 13 - this.pastMedia.length;
    }
  },
};
</script>

<style lang="scss" scoped>
  .image-tag-selection, .upload-button, .file-upload, .hide-buttons {
    margin-top: 1.25%;
  }

  .is-size-4 {
    margin-top: 1.25%;
  }

  .upload-button {
    margin-bottom: 1.25%;
  }

</style>
