<template lang="pug">

div#media-item(v-if="isUploader")
    div.uploading-container(v-if="isUploading")
        button.button.is-loading.is-primary.uploading-button
    div.file.is-boxed.file-upload(v-else)
        img(:src="imagePlus")
        input.file-input(
                type="file",
                name="file",
                v-on:change="handleFileChange"
            )
        div.mediaLeftCounter {{this.n}}/{{this.nTotal}}
div#media-item(v-else)
    img(:src="imageUrl")
     
</template>

<script>
/* eslint-disable no-underscore-dangle */
import API from '../../../api';
import NotificationController from '../../../controllers/notification';
import placeholderImage from "../../../assets/placeholder.png"
import plusImageWhite from "../../../assets/white-round-add-button.png"

export default {
  props: ['type', 'index', 'n', 'nTotal'],
  name: 'MediaPlaceholder',
  data() {
    return {
        isPermanent: this.type == "permanent",
        isUploader: this.index == 1,
        isUploading: false,
    };
  },
  computed: {
    imageUrl() {
      return placeholderImage;
    },
    imagePlus() {
        return plusImageWhite;
    },
  },
  methods: {
    async handleFileChange(e) {
       // eslint-disable-next-line prefer-destructuring
       this.isUploading = true;  
       try {
            this.file = e.target.files[0];
            const response = await API.uploadMedia(
                // set headers
                e.target.files[0],
                {
                    era: 'past',
                    locket: this.type,
                    emotions: '',
                    links: '',
                },
                this.$store.getters.getToken,
            );
            this.file = null;
            this.$store.commit('addMedia', response);
        } catch(e) {
            NotificationController.setNotification('danger', 'Something went wrong');
            this.file = null;
        } finally {
            this.isUploading = false;
        }
    },
},
};
</script>

<style lang="scss" scoped>

.file-input {
    cursor: pointer;
}

.uploading-container {
   $maxImgSize: 256px;
    margin-left: auto;
    margin-right: auto;
    display: block;

    max-height: $maxImgSize;
    max-width: $maxImgSize;

    min-height: 166.99px;
    min-width: 166.99px;

    height: 100%;
    width: 100%;
}

@media all and (max-width: 799px) {

    .uploading-container {
        height: 256px;
    }

}

@media all and (min-width: 1215px) {

    .uploading-container {
        height: 256px;
    }

}

.uploading-button {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    font-size: 100px;
}

.mediaLeftCounter {
    position: absolute;
    color: white;
    font-size: 20px;
    font-weight: 600;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 200%);
}

#media-item {
    padding: 0.75%;
    vertical-align: top;
    max-height: 276.16px;

    img {
      $maxImgSize: 256px;
      margin-left: auto;
      margin-right: auto;
      display: block;

      max-height: $maxImgSize;
      max-width: $maxImgSize;

      height: 100%;
      width: 100%;

      border-radius: 50%;

      background: #00d1b2;
    }
  }

  
</style>
