<template lang="pug">
  div#input-bar
    div.field.has-addons
      div.control.text-input
        input.input(
          type="text",
          :placeholder="placeholder",
          v-model="value",
          v-on:keyup.enter="onSubmit"
        )
      div.control
        a#submit-todo.button.is-info.is-outlined(
          :disabled="value.length < 1"
        @click="onSubmit"
        )
          span.icon.is-small
            i.fas.fa-plus(
              :class="[iconGroup, icon]"
            )
</template>

<script>
export default {
  name: 'InputBar',
  props: ['iconGroup', 'icon', 'placeholder'],
  methods: {
    onSubmit() {
      this.$emit('on-submit', this.value);
      this.value = '';
    },
  },
  data() {
    return {
      value: '',
    };
  },
};
</script>

<style scoped>

</style>
