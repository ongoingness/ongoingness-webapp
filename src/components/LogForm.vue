<template lang="pug">
div#media.container(style="padding-bottom: 30px;")
    h2.is-size-3 Users
    div.user-container
        UserSelect.user-item(
            v-for="u in users"
            :user="u",
            v-bind:key="u.id",
        )
    h2.is-size-3 Codes
    div.code-container
        CodeItem.code-item(
            v-for="c in codes"
            :code="c",
            v-bind:key="c",
        )
    h2.is-size-3 Timeline
    div.code-container
        div.time-selector-container
            label From:
            input(type="date" @change="setFrom").time-selector
        div.time-selector-container
            label To:
            input(type="date" @change="setTo").time-selector
    
    div(style="text-align: center;")
        button(@click="searchLogs" style="width: 400px;" :class="{ 'is-loading': loadingData }").button.is-primary.is-large Search

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
    data() {
        return {
            loadingData: false
        }
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

            var codes = this.$store.getters.getLogFormCodes;
            var user = this.$store.getters.getLogFormUser;
            var token = this.$store.getters.getToken;
            var from = this.$store.getters.getLogFormFrom;
            var to = this.$store.getters.getLogFormTo;
            var pageAmount = this.$store.getters.getLogPageRequestAmount;
            var pageSize = this.$store.getters.getLogPageSize;

            if(user != null && token != null) {

                this.loadingData = true;

                this.$store.commit("resetLogs");

                var result = await API.searchLogs(token, codes, user, 1, pageAmount, pageSize, from, to);

                if(result.pages.length > 0) {

                    for(var i = 0; i < result.pages.length; i++) {
                        if(result.pages != null)
                            this.$store.commit('addLogPage', result.pages[i]);
                    }

                    this.$store.commit('setLogPageAdded', result.pages[result.pages.length-1].index);

                    this.$store.commit('setLastPage', result.totalPages);

                }

                this.loadingData = false;

            }
        },

        setFrom(e) {
            this.$store.commit("setLogFormFrom", Number(new Date(e.target.value).getTime()));
        },

        setTo(e) {
            let selectedDate = new Date(e.target.value)
            let newDate = new Date(`${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}T23:59:59.999Z`);

            this.$store.commit("setLogFormTo", Number(newDate));
        },

    },


}
</script>
<style lang="scss" scoped>

    .is-size-3 {
        margin-top: 2.5%;
    }

    .users-container, .code-container {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
    }
   
   .user-item, .code-item {
        display: inline-block;
        background: white;
        padding: 8px;
        border-radius: 25px;
        border-style: solid; 
        border-width: 1px;
        border-color: lightgray;
        margin-bottom: 8px;
        margin-right: 8px;
        color: black;
   }

   .time-selector-container {
        display: inline-block;
        background: white;
        padding: 8px;
        margin-bottom: 8px;
        margin-right: 8px;
        margin-left: 10px;
        color: black;
   }

    .time-selector {
        display: inline-block;
        background: white;
        padding: 8px;
        margin-bottom: 8px;
        margin-right: 8px;
        margin-left: 10px;
        color: black;
        font-size: 16px;
        border-radius: 25px;
        border-style: solid; 
        border-width: 1px;
        border-color: lightgray;
        text-align: center;
   }

</style>