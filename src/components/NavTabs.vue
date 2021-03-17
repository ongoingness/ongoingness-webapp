<template lang="pug">
  div#nav-tabs.container
    div.tabs.is-centered.is-medium
      ul
        li#images(
          :class="{'is-active': active.images}",
          @click="setActive('media')"
        )
          a
            span.icon.is-small
              i.fas.fa-image(
                aria-hidden="true"
              )
            span Media
        li#devices(
          :class="{'is-active': active.devices}",
          @click="setActive('devices')"
        )
          a
            span.icon.is-small
              i.far.fa-circle(
              aria-hidden="true"
              )
            span Devices
</template>

<script>
export default {
  name: 'NavTabs',
  data() {
    return {
      active: {
        images: true,
        devices: false,
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
        case 'media':
          this.active.images = true;
          break;
        case 'devices':
          this.active.devices = true;
          break;
        default:
          this.active.images = true;
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
