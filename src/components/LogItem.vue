<template lang="pug">
    tr
        td {{ code }}
        td {{ timestamp }}
        td.content {{ content }}
        td {{ message }}
</template>

<script>
export default {
    props: ['log'],
    name: 'LogItem',
    computed: {
        code() {
            return this.log.code;
        },
        timestamp() {
            return this.log.timestamp.replace("T", " ").replace("Z","");
        },
        content() {
            var s = '';
            var contentJSON = JSON.parse(this.log.content);
            var contentKeys = Object.keys(contentJSON);
            for(var i = 0; i < contentKeys.length; i++) {
                if(contentKeys[i] != 'token' && contentKeys[i] != 'user')
                    s += `${contentKeys[i]}: ${contentJSON[contentKeys[i]]}\n`;
            }
            return s;
        },
        message() {
            return this.log.message;
        }
    }
    
}
</script>

<style scoped lang="scss">

.content {
    white-space:pre-wrap;
    padding-bottom: 25px;
}
td {
    padding: 10px;
    width: 250px;
    text-align:  center;
}

</style>