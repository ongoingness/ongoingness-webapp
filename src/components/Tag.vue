<template lang="pug">
  div.tag.is-link.media-tag(v-if="isTime")
    div.tag-name
    |   {{ setName }}
  div.tag.is-danger.media-tag(v-else-if="isPlace")
    div.tag-name
    |   {{ setName }}
  div.tag.is-primary.media-tag(v-else)
    div.tag-name
    |   {{ setName }}
</template>

<script>

export default {
  props: ['tagname'],
  name: 'Tag',
  computed: {
    setName() {
      return this.tagname.includes('/') ? this.tagname.split('/')[1] : this.tagname;
    },
    isTime() {
      return this.tagname.includes('t/') || this.tagname.includes('time/');
    },
    isPlace() {
      return this.tagname.includes('p/') || this.tagname.includes('place/');
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
