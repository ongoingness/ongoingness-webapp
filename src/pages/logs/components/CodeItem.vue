<template lang="pug">
    div
        input(type='checkbox' v-bind:name="value" v-bind:value="value" @input="updateSelectedCode" unchecked) 
        label.code-button {{value}}
</template>

<script>

export default {
    props: ['code'],
    name: 'CodeItem',
    computed: {
        value() {
            return this.code;
        }
    },
    methods: {

        updateSelectedCode(e) {
             this.$store.commit('updateLogFormCode', e.target.value);
        }

    }
}
</script>
<style lang="scss" scoped>

    .code-button {
        padding: 10px;
        margin: 2px;
    }

</style>