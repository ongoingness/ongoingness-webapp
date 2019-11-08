<template lang="pug">
div
    div#media.container
        h2.is-size-3 Users
        div.user-container
            UserSelect(
                v-for="u in users"
                :user="u",
                v-bind:key="u.id",
            )

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
import UserSelect from './UserSelect.vue';
import CodeItem from './CodeItem.vue';
export default {

    name: 'LogForm',
    components: {
        UserSelect,
        CodeItem,
    },

    methods: {

    },
    computed: {
        users() {
            return this.$store.getters.getUsers;
        },
        codes() {
            return this.$store.getters.getLoggingCodes;
        },
    }

}
</script>
<style lang="scss" scoped>

    .users-container {
        text-align: center;
    }
   

</style>