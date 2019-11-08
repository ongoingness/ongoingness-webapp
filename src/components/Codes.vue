<template lang="pug">
    div#media.container
        h2.is-size-3 Codes
        div.user-container
            CodeItem(
                v-for="c in codes"
                :code="c",
                v-bind:key="c",
            )

</template>
<script>
import CodeItem from './CodeItem.vue';
export default {

    name: 'Codes',
    components: {
        CodeItem
    },

    methods: {

    },
    computed: {
        codes() {
            return this.$store.getters.getLoggingCodes;
        }
    }

}
</script>
<style lang="scss" scoped>

    .users-container {
        text-align: center;
    }
   

</style>