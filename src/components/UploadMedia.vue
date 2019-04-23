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
      div.emotions
        p Please best describe this picture using three emotions below.
        div.columns
          div.column.is-narrow
            div.field
              label.label First Emotion
              div.control
                div.select
                  select(
                  v-model="emotionsT1Idx"
                  )
                    option(
                    selected,
                    disabled
                    ) Please select...
                    option.emotion-option(
                    v-for="(emotion, idx) in emotions"
                    v-bind:value="idx"
                    ) {{ capitalizeFirstLetter(emotion.name) }}
          div.column.is-narrow
            div.field
              label.label Second Emotion
              div.control
                div.select
                  select(
                  v-model="emotionsT2Idx"
                  )
                    option(
                    selected,
                    disabled
                    ) Please select...
                    option.emotion-option(
                    v-for="(emotion, idx) in emotions[emotionsT1Idx].children"
                    v-bind:value="idx"
                    ) {{ capitalizeFirstLetter(emotion.name) }}
          div.column.is-narrow
            div.field
              label.label Third Emotion
              div.control
                div.select
                  select(
                  v-model="emotionsT3Idx"
                  )
                    option(
                    selected,
                    disabled
                    ) Please select...
                    option.emotion-option(
                    v-for="(emotion, idx) in t1Emotions.children[emotionsT2Idx].children"
                    v-bind:value="idx"
                    ) {{ capitalizeFirstLetter(emotion.name) }}

      button.button.upload-button.is-primary(
      @click="uploadFile",
      :disabled="(file === null)",
      :class="{ 'is-loading': isBusy }"
      ) Upload
</template>

<script>
import API from '../api';
import NotificationController from '../controllers/notification';
import emotions from '../emotions.json';

export default {
  name: 'UploadMedia',
  data() {
    return {
      file: null,
      era: 'past',
      ltag: 'temp',
      isBusy: false,
      isHidden: true,
      emotionsT1Idx: 0,
      emotionsT2Idx: 0,
      emotionsT3Idx: 0,
      emotions,
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
            emotions: [
              this.emotions[this.emotionsT1Idx].name,
              this.emotions[this.emotionsT1Idx].children[this.emotionsT2Idx].name,
              this.emotions[this.emotionsT1Idx].children[this.emotionsT2Idx]
                .children[this.emotionsT3Idx].name,
            ],
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
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
    t1Emotions() {
      return this.emotions[this.emotionsT1Idx];
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

  .emotions {
    margin-top: 1.25%;
  }
</style>
