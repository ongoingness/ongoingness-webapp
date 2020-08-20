<template lang="pug">
  div#nav-tabs.container
    div.tabs.is-centered.is-medium
      ul
        li#images(
          :class="{'is-active': active.logs}",
          @click="setActive('logs')"
        )
          a
            span.icon.is-small
              i.fas.fa-table(
                aria-hidden="true"
              )
            span Logs
        li#devices(
          :class="{'is-active': active.piece}",
          @click="setActive('piece')"
        )
          a
            span.icon.is-small
              i.far.fa-circle(
              aria-hidden="true"
              )
            span Piece Engagement
        li#devices(
          :class="{'is-active': active.content}",
          @click="setActive('content')"
        )
          a
            span.icon.is-small
              i.far.fa-circle(
              aria-hidden="true"
              )
            span Content Engagement
        li#devices(
          :class="{'is-active': active.website}",
          @click="setActive('website')"
        )
          a
            span.icon.is-small
              i.far.fa-circle(
              aria-hidden="true"
              )
            span Website Engagement 
</template>

<script>
export default {
  name: 'NavTabs',
  data() {
    return {
      active: {
        logs: true,
        piece: false,
        content: false,
        website: false,
      },
    };
  },
  methods: {
    /**
     * Set the active tab
     * @param tab
     */
    setActive(tab) {
      let noAction = false;

      Object.keys(this.active).forEach((key) => {
        this.active[key] = false;
      });

      switch (tab) {
        case 'logs':
          this.active.logs = true;
          break;
        case 'piece':
          this.active.piece = true;
          break;
        case 'content':
          this.active.content = true;
          break;
        case 'website':
          this.active.website = true;
          break;
        default:
          this.active.logs = true;
          noAction = true;
          break;
      }

      if (!noAction) {
        this.$emit('on-update', tab);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#nav-tabs {
  margin-top: 1.25%;
}
</style>
