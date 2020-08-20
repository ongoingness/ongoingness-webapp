<template lang="pug">
  div#notification.has-text-centered(
    v-show="isVisible",
    :style="{'opacity': opacity}"
  )
    div.notification(
      :class="getClass"
    )
      button.delete(
        @click="$store.commit('setNotificationVisibility', false)"
      )
      p {{ message }}
</template>

<script>
export default {
  name: 'Notification',
  data() {
    return {
      opacity: 0.5,
      interval: null,
      duration: 10,
    };
  },
  computed: {
    message() {
      return this.$store.getters.getNotificationMessage;
    },
    isVisible() {
      return this.$store.getters.getNotificationVisibility;
    },
    getClass() {
      const stored = this.$store.getters.getNotificationType;
      switch (stored) {
        case 'info':
          return 'is-info';
        case 'warning':
          return 'is-warning';
        case 'danger':
          return 'is-danger';
        default:
          return 'is-light';
      }
    },
  },
  watch: {
    isVisible(old) {
      if (old) {
        clearInterval(this.interval);
        const dur = this.duration * 1000;
        const step = dur / 100;
        let count = 0;
        this.opacity = 1.0;

        this.interval = setInterval(() => {
          this.opacity -= 0.01;
          count += step;

          if (count >= dur) {
            clearInterval(this.interval);
            this.$store.commit('setNotificationVisibility', false);
          }
        }, step);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#notification {
  position:fixed;
  top:5px;
  width:30%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
