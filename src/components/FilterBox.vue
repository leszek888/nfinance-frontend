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
        border: solid 1px #aaa;
        font-size: 11pt;
        padding: 0.2em;
        width: 90%;
    }
    .container-filterbox select {
        background: #fff;
        border: solid 1px #aaa;
        box-sizing: border-box;
        font-size: 11pt;
        margin: 0.25em;
        padding: 0.2em;
        width: 90%;
    }
    .container-filterbox input[type="date"] {
        appearance: none;
        background: #fff;
        border: solid 1px #aaa;
        box-sizing: border-box;
        font-family: "Helvetica", arial, sans-serif;
        font-size: 11pt;
    }
</style>
