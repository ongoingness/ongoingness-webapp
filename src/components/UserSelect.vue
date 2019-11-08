<template lang="pug">
    //button.user-logs-button {{ username }}
    div 
        input(type="radio", v-bind:name="user", v-bind:value="username" v-model="this.$store.mutations.setLogFormUser") 
        label.user-log-name {{ username }}
</template>

<script>

import API from "../api";

export default {
    props: ['user'],
    name: 'UserSelect',
    computed: {
        username() {
            return this.user.username;
        }
    },
}
</script>
<style lang="scss" scoped>

    .user-log-name {
        padding: 10px;
        margin: 2px;
    }

</style>