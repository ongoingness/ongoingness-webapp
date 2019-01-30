<template lang="pug">
  div#media-item
    div.columns
      div.column.is-one-fifth
        figure.image.is-128x128
          img.is-rounded(
          src="https://bulma.io/images/placeholders/128x128.png"
          )
      div.column
        p Added on:
        | {{ media.createdAt }}
</template>

<script>
export default {
  props: ['media'],
  name: 'MediaItem',
};
</script>

<style scoped>

</style>
