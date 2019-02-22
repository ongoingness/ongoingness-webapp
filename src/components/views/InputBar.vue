<template lang="pug">
  div#input-bar
    div.field.has-addons
      div.control.text-input
        input.input(
          type="text",
          :placeholder="placeholder",
          v-model="value",
          v-on:keyup.enter="$emit('on-submit', value)"
        )
      div.control
        a#submit-todo.button.is-info.is-outlined(
          :disabled="value.length < 1"
        @click="$emit('on-submit', value)"
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
  data() {
    return {
      value: '',
    };
  },
};
</script>

<style scoped>

</style>
