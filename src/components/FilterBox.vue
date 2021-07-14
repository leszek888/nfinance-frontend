<template>
    <div data-cy="container-filterbox" class="container-filterbox">
        <div class="filterbox-title">{{ title }}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'FilterBox',

    props: {
        title: String,
    },

    methods: {
        updateInfo(data) {
            console.log("updateInfo: ", data);
        },
    },
};
</script>
<style>
    .container-filterbox {
        border: solid 1px #ddd;
        height: 120pt;
        margin: 0.5em;
        text-align: center;
        width: 120pt;
    }
    .filterbox-title {
        padding: 0.25em 0em 0.75em 0em;
    }
    .container-filterbox input {
        box-sizing: border-box;
        padding: 0.2em;
        width: 90%;
    }
</style>
