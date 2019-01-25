<template lang="pug">
  div#app
    Title
</template>

<script>
import Title from './components/Title.vue';

export default {
  name: 'app',
  components: {
    Title,
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
