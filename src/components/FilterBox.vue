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
        border: none;
        display: flex;
        flex-direction: column;
        padding: 1em;
        width: 100%;
    }
    .filterbox-title {
        padding: 0.25em;
        font-size: 10pt;
    }
    .filterbox-inputs {
        width: 100%;
    }
    .filterbox-inputs input {
        width: 100%;
    }
    .filterbox-inputs select {
        width: 100%;
    }
</style>
