<template lang="pug">
    div#media.container(v-if="hasData" style="margin-top: 30px; margin-bottom: 60px;")

        div.field.has-addons(style="justify-content: center;border-bottom-style: solid; border-bottom-width: 2px; border-bottom-color: #209cee;")
            p.control.style(style="margin-right: 20px;")
                button(@click="goToFirstPage").button.is-info 1
            p.control
                button(@click="previousPage").button.is-info <-
            p.control
                button(disabled).button.is-info {{ currentPageIndex }}
            p.control
                button(@click="nextPage").button.is-info ->
            p.control.style(style="margin-left: 20px;")
                button(@click="goToLastPage").button.is-info {{ lastPageIndex }}


        table.log-table
            tr
                th Code
                th Timestamp
                th Content
                th Message
            LogItem(
                v-for="l in currentPageLogs"
                :log="l",
                v-bind:key="l._id",
            )

        div.field.has-addons(style="justify-content: center; border-top-style: solid; border-top-width: 2px; border-top-color: #209cee;")
            p.control.style(style="margin-right: 20px;")
                button(@click="goToFirstPage").button.is-info 1
            p.control
                button(@click="previousPage").button.is-info <-
            p.control
                button(disabled).button.is-info {{ currentPageIndex }}
            p.control
                button(@click="nextPage").button.is-info ->
            p.control.style(style="margin-left: 20px;")
                button(@click="goToLastPage").button.is-info {{ lastPageIndex }}

        
</template>

<script>

import LogItem from './LogItem.vue';

export default {
    name: 'LogsTable',
    components: { LogItem },
    computed: {
        currentPageLogs() {
            return this.$store.getters.getCurrentLogPage;
        },
        currentPageIndex() {
            return this.$store.getters.getCurrentLogPageIndex;
        },
        lastPageIndex() {
            return this.$store.getters.getLastLogPageIndex;
        },
        hasData() {
            return this.$store.getters.getCurrentLogPage != null;
        }
    },
    methods: {
        nextPage() {
            var token = this.$store.getters.getToken;
            this.$store.commit('goToNextPage', token);
        },
        previousPage() {
            this.$store.commit('goToPreviousPage', this.$store.getters.getToken);
        },

        goToFirstPage() {
            var token = this.$store.getters.getToken;
            this.$store.commit("goToPage", {page: 1, token});
        },

        goToLastPage() {
            var token = this.$store.getters.getToken;
            this.$store.commit("goToPage", {page: this.$store.getters.getLastLogPageIndex, token});
        },
    }

    

}
</script>

<style scoped lang="scss">

.empty-table {
    text-align: center;
    width: 100%;
}

.log-table {
    width: 100%;
}

th {
    padding-bottom: 25px;
    width: 250px;
}

.is-info {
    width: 50px;
}

tr:nth-child(even) {background-color: #f2f2f2;}

</style>