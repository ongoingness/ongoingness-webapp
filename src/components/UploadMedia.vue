<template lang="pug">
  div#upload-media
    h2.is-size-4 Upload Media
    p Upload media to displayed your locket.

    div.hide-buttons
      button.button(
        v-if="isHidden"
        @click="isHidden = false"
      ) Add Media
      button.button(
        v-else
        @click="isHidden = true"
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
</template>

<script>
import API from '../api';
import NotificationController from '../controllers/notification';

export default {
  name: 'UploadMedia',
  data() {
    return {
      file: null,
      era: 'past',
      ltag: 'temp',
      isBusy: false,
      isHidden: true,
    };
  },
  methods: {
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
      return this.file === null ? 'Your Image' : this.file.name;
    },
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

  .expand-button {
    margin-left: 5px;
  }
</style>
