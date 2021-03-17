<template lang="pug">
  div#upload-media
    h2.is-size-4 Upload Media
    div
      div.control.image-tag-selection
        p Which collection should this media be added to?
        label.radio
          input(
          type="radio",
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
          value="temporary",
          v-model="ltag"
          )
          | &nbsp; Temporary Collection

      div(v-if="ltag == 'temporary'")
        label(for="temporary_month") Month
        input(
          type="text",
          id="temporary_month",
          name="temporary_month",
          maxlength="2",
          v-model="temporary_month"
          )
        label(for="temporary_day") Day
        input(
          type="text",
          id="temporary_day",
          name="temporary_day",
          maxlength="2",
          v-model="temporary_day"
          )

      div.file.is-boxed.file-upload(v-if="ltag != 'unset'")
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
      uploadHidden: true,
      dateHidden: true,
      emotions: [],
      lcontent: 'file',
      value: [],
      options: [],
      linkedMedia: [],
      temporary_day: 0,
      temporary_month: 0,
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
        let tags = '';
        if (this.ltag === 'temporary') {
          if (isNaN(this.temporary_month) || isNaN(this.temporary_month))
            throw new Exception("Date not valid");

            var temporary_day = Number(this.temporary_day);
            var temporary_month = Number(this.temporary_month);     

            if(temporary_day < 1 || temporary_month < 1 || temporary_month > 12)
              throw new Exception("Date not valid");

            const today = new Date();
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() /* - 1 + 1 */, 0).getDate();

            if(temporary_day > lastDayOfMonth)
              throw new Exception("Date not valid");

            var mediaDate = new Date(1970, this.temporary_month - 1, this.temporary_day);
            tags += `t/${mediaDate.getTime()}`;
        }

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
        
       
        this.$store.commit('addMedia', response);

      } catch (e) {
        NotificationController.setNotification('danger', 'Something went wrong');
      } finally {
        this.isBusy = false;
        this.options = [];
        this.value = [];
        this.ltag = 'unset';
        this.file = null;
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
  },
};
</script>

<style lang="scss" scoped>
  .image-tag-selection, .upload-button, .file-upload {
    margin-top: 1.25%;
  }

  .is-size-4 {
    margin-top: 1.25%;
  }

  .upload-button {
    margin-bottom: 1.25%;
  }

</style>
