<template lang="pug">
  div#new-media
    div.actions
      span.icon
        i.fas.fa-trash
    figure
      div.add-img.has-text-centered
        div.placeholder
          Upload.upload-icon
    br
    div.has-text-centered
      p Add a new photo
      | to the collection.
</template>

<script>
import Upload from './icons/Upload.vue';

export default {
  name: 'NewMedia',
  components: { Upload },
};
</script>

<style lang="scss" scoped>
  #new-media {
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    padding: 0.75%;

    .actions {
      color: transparent;
    }

    .add-img {
      $maxImgSize: 256px;
      margin-left: auto;
      margin-right: auto;
      display: block;

      max-height: $maxImgSize;
      max-width: $maxImgSize;

      height: $maxImgSize;
      width: 100%;

      border-radius: 50%;
      margin-top: 2.5%;
    }

    .placeholder {
      height: 100%;
      width: 100%;
      line-height: 100%;
      border-radius: 50%;
      background: #AAAAAA;

      .upload-icon {
        margin-top: 25%;
        height: 50%;
        width: 50%;
        stroke: white;
        fill: white;
      }
    }
  }
</style>
