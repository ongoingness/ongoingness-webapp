<template lang="pug">
  div#media-item
      div.actions-temporary(
        v-show="isLoaded",
        v-if="isTemporary"
      )
        span.icon.action.pointer(
          @click="deleteMedia(media._id)"
        )
          i.fas.fa-times.icon-size
      img(
        v-show="isLoaded"
        :src="imageUrl"
         @load="loaded"
      )
      div.uploading-container(v-show="!isLoaded")
        button.button.is-loading.is-primary.uploading-button(v-show="!isLoaded")
</template>

<script>
/* eslint-disable no-underscore-dangle */
import API from '../../../api';
import NotificationController from '../../../controllers/notification';

export default {
  props: ['media'],
  name: 'MediaItem',
  data() {
    return {
      isLoaded: false,
    };
  },
  computed: {
    imageUrl() {
      return `${API.URL}/media/${this.media._id}?token=${this.$store.getters.getToken}`;
    },
    isTemporary() {
      return this.media.locket=="temporary";
    }
  },
  methods: {
    async deleteMedia(id) {
      try {
        this.$confirm("Do you want to remove this content?", 
                      "Remove Content", '',
                      {imageUrl: this.imageUrl, imageHeight: 256, confirmButtonColor: '#00d1b2',}
                      ).then( async() => {
            try {
              await API.deleteMedia(id, this.$store.getters.getToken);
            } catch (e) {
              NotificationController.setNotification('danger', 'Could not delete media');
              return;
            }
            this.$store.commit('removeMedia', id);
            });
      } catch (e) {
        console.log(e);
      }
    },
    loaded() {
      this.isLoaded = true;
    }
  },
};
</script>

<style lang="scss" scoped>

  .actions-temporary{
    position: absolute;
    right: 12px;
    top: 12px;
  }

@media all and (max-width: 915px) {

    .actions-temporary {
        right: 0px;
    }

}

  .pointer {
    cursor: pointer;
  }

  .icon-size {
    width: 25px;
    height: 25px;
  }

  #media-item {

    padding: 0.75%;
    vertical-align: top;

    position: relative;

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
      box-shadow: 5px 5px 15px darkgrey;
    }
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
    background: none;
}

.button.is-primary.is-loading::after {
  border-color: transparent transparent #00d1b2 #00d1b2 !important;
}

</style>
