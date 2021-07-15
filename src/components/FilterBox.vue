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
};
</script>
<style>
    .container-filterbox {
        background-color: #fafafa;
        border: none;
        box-shadow: 0px 0px 6px #ccc;
        height: 105pt;
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
