<template>
    <div data-cy="container-filterbox">
        <span class="filterbox-title">{{ title }}</span>
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
