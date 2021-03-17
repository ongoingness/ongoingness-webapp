<template lang="pug">
  div.tag.is-link.media-tag
    div.tag-name
    |   {{ setName }}
</template>

<script>

export default {
  props: ['tagname'],
  name: 'TagTime',
  computed: {
    setName() {
      return this.tagname;
    },
  },
};
</script>

<style lang="scss" scoped>
    .tag-name {
        text-align: center;
    }

    .media-tag {
        margin: 5px;
    }
</style>
