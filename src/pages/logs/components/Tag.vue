<template lang="pug">
  div.tag.is-link.media-tag(v-if="isTime")
    div.tag-name
    |   {{ setName }}
  div.tag.is-danger.media-tag(v-else-if="isPlace")
    div.tag-name
    |   {{ setName }}
  div.tag.is-warning.media-tag(v-else-if="isPerson")
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
      if (this.tagname.includes('/')) return this.tagname.split('/')[1];
      else if (this.tagname.includes('@')) return this.tagname.split('@')[1];
      return this.tagname;
    },
    isTime() {
      return this.tagname.includes('t/') || this.tagname.includes('time/');
    },
    isPlace() {
      return this.tagname.includes('p/') || this.tagname.includes('place/');
    },
    isPerson() {
      return this.tagname.includes('@');
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
