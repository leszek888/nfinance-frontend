<template>
    <div data-cy="container-filterbox">
        <span class="filterbox-title">{{ title }}</span>
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
