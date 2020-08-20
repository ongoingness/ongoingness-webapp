<template lang="pug">
    //button.user-logs-button {{ username }}
    div 
        input(type="radio", v-bind:name="user", v-bind:value="id" @input="updateSelectedUser") 
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
        },
        id() {
            return this.user.id;
        },
    },
    methods: {
        updateSelectedUser(e) {
            this.$store.commit('setLogFormUser', e.target.value);
        },
    }
}
</script>
<style lang="scss" scoped>

    .user-log-name {
        padding: 10px;
        margin: 2px;
    }

</style>