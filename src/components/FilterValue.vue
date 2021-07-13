<template>
    <div data-cy="container-filter">
        <input @keydown="handleKeyDown" />
    </div>
</template>

<script>
export default {
    name: 'FilterDate',

    props: {
        name: String,
    },

    methods: {
        handleKeyDown(e) {
            if (e.keyCode === 13)
                this.$emit('filter-update', { type: 'value', name: this.name, value: e.target.value });
        },
    },

    emits: [ 'filter-update' ],
}
</script>
