<template lang="pug">
div#media.container
    div
        h2.is-size-3 Users
        div.user-container
            UserSelect(
                v-for="u in users"
                :user="u",
                v-bind:key="u.id",
            )

    div
            h2.is-size-3 Codes
            div.user-container
                CodeItem(
                    v-for="c in codes"
                    :code="c",
                    v-bind:key="c",
                )

    div
        button(@click="searchLogs") Search

</template>
<script>
import UserSelect from './UserSelect.vue';
import CodeItem from './CodeItem.vue';
import API from '../api';

export default {

    name: 'LogForm',
    components: {
        UserSelect,
        CodeItem,
    },
    computed: {
        users() {
            return this.$store.getters.getUsers;
        },
        codes() {
            return this.$store.getters.getLoggingCodes;
        },
    },
    methods: {
        async searchLogs() {

            this.$store.commit("resetLogs");

            var codes = this.$store.getters.getLogFormCodes;
            var user = this.$store.getters.getLogFormUser;
            var token = this.$store.getters.getToken;

            var result = await API.searchLogs(token, codes, user, 1, 10, 20);
            console.log(result);

            for(var i = 0; i < result.pages.length; i++) {
                if(result.pages != null)
                    this.$store.commit('addLogPage', result.pages[i]);
            }

            this.$store.commit('setLastPage', result.totalPages);
            

            console.log(this.$store.getters.getAllLogPages)
            console.log(this.$store.getters.getLogPage(1));

        }

    },
}
</script>
<style lang="scss" scoped>

    .users-container {
        text-align: center;
    }
   

</style>