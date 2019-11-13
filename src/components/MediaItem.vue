<template lang="pug">
  div#media-item
      div.actions-temporary(
        v-if="isTemporary"
      )
        span.icon.action.pointer(
          @click="deleteMedia(media._id)"
        )
          i.fas.fa-trash.icon-size
      img(
        :src="imageUrl"
      )
</template>

<script>
/* eslint-disable no-underscore-dangle */
import API from '../api';
import NotificationController from '../controllers/notification';
import Tag from './Tag.vue';
import { async } from 'q';

export default {
  props: ['media'],
  name: 'MediaItem',
  components: { Tag },
  computed: {
    imageUrl() {
      return `${API.URL}/media/${this.media._id}?token=${this.$store.getters.getToken}`;
    },
    formattedDate() {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      const today = new Date(this.media.createdAt);
      return today.toLocaleDateString(options);
    },
    tags() {
      return this.media.emotions;
    },
    isTemporary() {
      return this.media.locket=="temporary";
    }
  },
  methods: {
    async deleteMedia(id) {
      try {
        this.$confirm("Do you want to delete this content?", "Delete Content", 'question').then( async() => {
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
    tagKey(tag) {
      return `${this.media._id}-${tag}`;
    },
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

  .tag-list {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  #media-item {
    //box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
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
</style>
