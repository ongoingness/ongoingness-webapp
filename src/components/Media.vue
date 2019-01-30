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

        button.button.upload-button(
          @click="uploadFile",
          :disabled="(file === null)"
        ) Upload

      div.all-media
        h2.is-size-4 Your Media
        ul.list(
          v-if="media.length > 0"
        )
          li.list-item(
            v-for="m in media"
          ) {{ m._id }}

        p(
          v-else
        ) You have no media
</template>

<script>
import API from '../api';

export default {
  name: 'Media',
  data() {
    return {
      file: null,
      era: 'past',
      ltag: '',
    };
  },
  computed: {
    media() {
      return this.$store.getters.getMedia;
    },
    filename() {
      return this.file === null ? 'Your Image' : this.file.name;
    },
  },
  methods: {
    async uploadFile() {
      if (this.ltag === '') {
        alert('must select tag');
        // TODO: display error.
        this.ltag = 'temp';
        return;
      }
      try {
        const response = await API.uploadMedia(
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
        console.log(e);
        // TODO: Handle error.
        this.file = null;
      }
    },
    handleFileChange(e) {
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
}
</style>
