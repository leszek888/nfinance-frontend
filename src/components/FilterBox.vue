<template>
    <div data-cy="container-filterbox" class="container-filterbox">
        <div class="filterbox-title">{{ title }}</div>
        <div class="filterbox-inputs">
            <slot></slot>
        </div>
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
        align-items: flex-start;
        background-color: #fafafa;
        border: none;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding: 1em;
        width: 100%;
    }
    .filterbox-title {
        padding: 0.25em;
    }
    .filterbox-inputs {
        width: 100%;
    }
    .filterbox-inputs input {
        box-sizing: border-box;
        border: solid 1px #aaa;
        font-size: 11pt;
        padding: 0.2em;
        width: 100%;
    }
    .filterbox-inputs select {
        background: #fff;
        border: solid 1px #aaa;
        box-sizing: border-box;
        font-size: 11pt;
        padding: 0.2em;
        width: 100%;
    }
    .filterbox-inputs input[type="date"] {
        appearance: none;
        background: #fff;
        border: solid 1px #aaa;
        box-sizing: border-box;
        font-family: "Helvetica", arial, sans-serif;
        font-size: 11pt;
        width: 100%;
    }
</style>
