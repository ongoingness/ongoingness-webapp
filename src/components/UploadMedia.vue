<template lang="pug">
  div#upload-media
    h2.is-size-4 Upload Media
    p Upload media to displayed your locket.

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

      div.control.image-tag-selection
        p Is your content a:
        label.radio
          input(
          type="radio",
          name="mcontent",
          value="file",
          v-model="lcontent"
          )
          | &nbsp; File
        br
        label.radio
          input(
          type="radio",
          name="mcontent",
          value="quote",
          v-model="lcontent"
          )
          | &nbsp; Quote


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
        p Is your content:
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
        p Please best describe this content using tags.
          div
            multiselect(
              v-model="value",
              tag-placeholder="Add this as new tag",
              placeholder="Search or add a tag",
              label="name",
              track-by="code",
              :options="options",
              :multiple="true",
              :taggable="true",
              @tag="addTag",
            )
      br
      div
        p Please select media you wish to associate from the gallery below.
      button.button.upload-button.is-primary(
      @click="uploadFile",
      :disabled="(file === null || file === undefined)",
      :class="{ 'is-loading': isBusy }"
      ) Upload
</template>

<script>
import Multiselect from 'vue-multiselect';
import API from '../api';
import NotificationController from '../controllers/notification';
import emotions from '../emotions.json';

export default {
  components: {
    Multiselect,
  },
  name: 'UploadMedia',
  props: ['selectedMedia'],
  created() {
    this.$eventBus.$on('selectedMedia', (data) => {
      if (data !== '') {
        if (this.linkedMedia.includes(data)) {
          this.linkedMedia.splice(this.linkedMedia.indexOf(data), 1);
        } else {
          this.linkedMedia.push(data);
        }
      }
    });
  },
  data() {
    return {
      file: null,
      era: 'past',
      ltag: 'temp',
      isBusy: false,
      isHidden: true,
      emotions,
      lcontent: 'file',
      value: [],
      options: [],
      linkedMedia: [],
    };
  },
  methods: {

    submit() {
      this.isHidden = !this.isHidden;
      this.$eventBus.$emit('addingMedia', !this.isHidden);
    },
    addTag(newTag) {
      let code;
      const name = newTag;
      if (newTag.includes('p/') || newTag.includes('place/')) {
        code = 'place';
      } else if (newTag.includes('t/') || newTag.includes('time/')) {
        code = 'time';
      } else {
        code = 'normal';
      }
      const tag = {
        name,
        code,
      };

      this.options.push(tag);
      this.value.push(tag);
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
        const tags = [];
        this.value.forEach((element) => {
          tags.push(element.name);
        });

        const response = await API.uploadMedia(
          // set headers
          this.file,
          {
            era: this.era,
            locket: this.ltag,
            emotions: tags,
            links: this.linkedMedia,
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
        this.$eventBus.$emit('clearSelectedMedia', true);
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
      return this.file === null || this.file === undefined ? 'Your media' : this.file.name;
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
