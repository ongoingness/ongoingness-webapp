<template lang="pug">
    div
        input(type='checkbox' v-bind:name="value" v-bind:value="value" unchecked) 
        label {{value}}
</template>

<script>

import API from "../api";

export default {
    props: ['code'],
    name: 'CodeItem',
    computed: {
        value() {
            return this.code;
        }
    },
}
</script>
<style lang="scss" scoped>

    .user-logs-button {
        padding: 10px;
        margin: 2px;
    }

</style>