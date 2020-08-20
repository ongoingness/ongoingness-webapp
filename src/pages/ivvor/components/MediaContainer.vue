<template lang="pug">
    div
        h3.is-size-5.media-collection-header {{ dayContent.dateId}}
        div.media-collection
            MediaItem.media-item(
                v-for="m in dayContent.content"
                :media="m",
                v-bind:key="m.id",
            )

</template>

<script>

import MediaItem from './MediaItem.vue';

export default {
    props:['dayContent'],
    name: 'ContainerMedia',
    components: {
        MediaItem,
    }
}

</script>

<style scoped lang="scss">

.media-collection-header {
    margin-top: 2.5%;
}

#media {
  margin-bottom: 5%;

  .all-media {
    margin-top: 2.5%;
  }

  .is-size-3 {
    margin-top: 1.25%;
  }

  .is-size-4 {
    margin-top: 1.25%;
  }

  .media-item {
    display: inline-block;
    margin-bottom: 8px;
    width: 100%;
    margin-right: 8px;
  }

  @media screen and (min-width: 800px) {
    .media-item {
      width: calc(25% - 6px);
    }

    .media-item:nth-of-type(2n) {
      margin-right: 6px;
    }

    .media-item:nth-of-type(4n) {
      margin-right: 0;
    }
  }

  .media-collection {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
  }

  .media-header {
    margin-top: 2.5%;
  }
}
@media (max-width: 1080px) {
  #media {
    margin-left: 32px;
    margin-right: 32px;
  }
}
</style>