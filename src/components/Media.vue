<template lang="pug">
  div#media
    div.container
      div.header
        h1.is-size-3 Media

      div.new-media
        h2.is-size-4 Upload Media
        div.file.is-boxed
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
        button.button(
          @click="uploadFile"
        ) Upload

      div.all-media
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
    };
  },
  computed: {
    media() {
      return this.$store.getters.getMedia;
    },
    filename() {
      return this.file === null ? 'file-name' : this.file.name;
    },
  },
  methods: {
    async uploadFile() {
      console.log(this.file);

      try {
        const response = await API.uploadMedia(
          this.file,
          { era: this.era },
          this.$store.getters.getToken,
        );
        console.log(response);

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
}
</style>
