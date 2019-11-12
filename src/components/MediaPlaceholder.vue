<template lang="pug">
  div#media-item()
    
      
    div.upper-padding(v-if="!isPermanent")
    figure
        div.file.is-boxed.file-upload
            img(
                v-if="isUploader"
                :src="imagePlus"
            )   
            input.file-input(v-if="isUploader"
                    type="file",
                    name="file",
                    v-on:change="handleFileChange"

                    )
            img(
                v-else
                :src="imageUrl"
            )
    br
    div.has-text-centered
      div.info-permanent.is-size-6(v-if="isPermanent")
        p(v-if="isUploader") Add Media
        p(v-else) Empty Slot
      div.info-temporary.is-size-6(v-else)
        p(v-if="isUploader") Add Media    
        p(v-else) Empty Slot
       
</template>

<script>
/* eslint-disable no-underscore-dangle */
import API from '../api';
import NotificationController from '../controllers/notification';

import placeholderImage from "../assets/placeholder.png"
import plusImage from "../assets/round-add-button.png"

export default {
  props: ['type', 'index'],
  name: 'MediaPlaceholder',
  data() {
    return {
        isPermanent: this.type == "permanent",
        isUploader: this.index == 1
    };
  },
  computed: {
    imageUrl() {
      return placeholderImage;
    },
    imagePlus() {
        return plusImage;
    }
  },
  methods: {
   async handleFileChange(e) {
      // eslint-disable-next-line prefer-destructuring
      this.file = e.target.files[0];
      const response = await API.uploadMedia(
        // set headers
        e.target.files[0],
        {
            era: 'past',
            locket: this.type,
            emotions: [],
            links: [],
        },
        this.$store.getters.getToken,
    );
    this.file = null;
    this.$store.commit('addMedia', response);
    },
  },
};
</script>

<style lang="scss" scoped>

.upper-padding {
    padding-bottom: 36px;
}

.info-permanent {
    padding-bottom: 35px;
}

.info-temporary {
    padding-bottom: 15px;
}

.file-input {
    cursor: pointer;
}

#media-item {
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    padding: 0.75%;
    vertical-align: top;

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
      margin-top: 2.5%;
    }
  }
</style>
