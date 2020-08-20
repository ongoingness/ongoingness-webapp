<template lang="pug">
  div#media-item(
      @click="selectMedia(media._id)"
      v-bind:class="{ selected : isSelected, linked : isLinked }"
      @mouseover="showLinkedMedia()"
      @mouseleave="hideLinkedMedia()"
    )
    div.actions.has-text-right
      span.icon.action(
        @click="deleteMedia(media._id)"
      )
        i.fas.fa-trash
    figure
      img(
        :src="imageUrl"
      )
    br
    div.has-text-centered
      div.date
        p Added on:
        | {{ formattedDate }}
    div.has-text-centered.tag-container
      p Tags:
      div.tag-list
        Tag(
          v-for="t in tags"
          :tagname="t"
          v-bind:key="tagKey(t)"
        )
</template>

<script>
/* eslint-disable no-underscore-dangle */
import API from '../api';
import NotificationController from '../controllers/notification';
import Tag from './Tag.vue';

export default {
  props: ['media'],
  name: 'MediaItem',
  components: { Tag },
  created() {
    this.$eventBus.$on('addingMedia', (data) => {
      this.addingData = data;
    });
    this.$eventBus.$on('linkedMedia', (data) => {
      if (data.action === 'show') {
        if (data.links.includes(this.media._id)) {
          this.isLinked = true;
        } else {
          this.isLinked = false;
        }
      } else if (data.action === 'hide') {
        this.isLinked = false;
      }
    });
    this.$eventBus.$on('clearSelectedMedia', () => {
      this.isSelected = false;
    });
  },
  data() {
    return {
      addingData: false,
      isSelected: false,
      isLinked: false,
    };
  },
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
  },
  methods: {
    async deleteMedia(id) {
      try {
        this.$eventBus.$emit('linkedMedia', { action: 'hide' });
        await API.deleteMedia(id, this.$store.getters.getToken);
      } catch (e) {
        NotificationController.setNotification('danger', 'Could not delete media');
        return;
      }
      this.$store.commit('removeMedia', id);
    },
    selectMedia(id) {
      if (this.addingData) {
        this.$eventBus.$emit('selectedMedia', id);
        this.isSelected = !this.isSelected;
      }
    },
    showLinkedMedia() {
      this.$eventBus.$emit('linkedMedia', { action: 'show', id: this.media._id, links: this.media.links });
    },
    hideLinkedMedia() {
      this.$eventBus.$emit('linkedMedia', { action: 'hide' });
    },
    tagKey(tag) {
      return `${this.media._id}-${tag}`;
    },
  },
};
</script>

<style lang="scss" scoped>
  .linked {
    outline: blue;
    outline-style: dashed;
  }

  .selected {
    outline: lightsalmon;
    outline-style: dashed;
  }

  .tag-container {
    padding: 10px;
  }

  .tag-list {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
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

    .action:hover {
      cursor: pointer;
      color: #ff3860;
    }
  }
</style>
