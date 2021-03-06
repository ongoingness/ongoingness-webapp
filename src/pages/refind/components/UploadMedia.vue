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
        p Is your content from the:
        label.radio
          input(
          type="radio",
          name="mtag",
          value="present",
          v-model="ltag"
          )
          | &nbsp; Present
        br
        label.radio
          input(
          type="radio",
          name="mtag",
          value="past",
          v-model="ltag"
          )
          | &nbsp; Past
      div.emotions
        p Please best describe this content using tags.
          div
            p There are 3 types of tags:
            ul.tagtypes
              li @  - People
              li t/ - Time
              li p/ - Place
            p To use them insert the following characters at the start of the tag:
            p Example: t/now
          div
            multiselect(
              v-model="value",
              tag-placeholder="Add this as new tag",
              placeholder="Search or add a tag",
              label="name",
              track-by="name",
              :options="options",
              :multiple="true",
              :taggable="true",
              @tag="addTag",
              @search-change="getSuggestedTags",
              @update="asyncUpdate"
            )
      br
      div
      button.button.upload-button.is-primary(
      @click="uploadFile",
      :disabled="(file === null || file === undefined)",
      :class="{ 'is-loading': isBusy }"
      ) Upload
</template>

<script>
import Multiselect from 'vue-multiselect';
import API from '../../../api';
import NotificationController from '../../../controllers/notification';

export default {
  components: {
    Multiselect,
  },
  name: 'UploadMedia',
  props: ['selectedMedia'],
  data() {
    return {
      file: null,
      era: 'past',
      ltag: 'present',
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
    addTag(newTag) {
      // eslint-disable-next-line
      this.value.push({ 'name': newTag });
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
        let tags = '';
        this.value.forEach((element) => {
          tags += `${element.name},`;
        });

        tags = tags.slice(0, -1);

        const response = await API.uploadMedia(
          // set headers
          this.file,
          {
            era: this.era,
            locket: this.ltag,
            emotions: tags,
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
    async getSuggestedTags(query) {
      if (query.length === 0) {
        this.options = [];
      } else {
        const aux = await API.getTagSuggestion(this.$store.getters.getToken, query);
        const result = [];
        for (let i = 0; i < aux.length; i += 1) {
          let c = '';
          let value = aux[i].name;
          if (query.includes('t/')) {
            c = 't/';
            // eslint-disable-next-line prefer-destructuring
            value = aux[i].value;
          } else if (query.includes('p/')) c = 'p/';
          else if (query.includes('@')) c = '@';
          // eslint-disable-next-line
          result.push({ 'name': `${c}${value}` });
        }
        this.options = result;
      }
    },
    asyncUpdate(newVal) {
      this.options = newVal;
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

  .emotions {
    margin-top: 1.25%;
  }

  .tagtypes {
    list-style-type:square;
    padding-left: 30px;
  }

</style>
