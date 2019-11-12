<template lang="pug">
    div#media.container
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
            div
                button(@click="previousPage") Previous 
                button(@click="nextPage") Next

        
</template>

<script>

import LogItem from './LogItem.vue';

export default {
    name: 'LogsTable',
    components: { LogItem },
    computed: {
        currentPageLogs() {
            //return this.$store.getters.getLogPage(this.currentPage);
            return this.$store.getters.getCurrentLogPage;
        }

    },
    methods: {
        nextPage() {
            this.$store.commit('goToNextPage');
        },
        previousPage() {
            this.$store.commit('goToPreviousPage');
        }
    }

    

}
</script>

<style scoped lang="scss">
.log-table {
    width: 100%;
}

th {
    padding-bottom: 25px;
    width: 250px;
}

</style>