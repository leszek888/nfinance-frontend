<template>
    <div data-cy="container-filter" :name="name" class="container-filter">
        <input ref="filterinput" @keydown="handleKeyDown" @blur="emitFilter" :value="value" />
    </div>
</template>

<script>
export default {
    name: 'Filter',

    props: {
        name: String,
        value: String,
    },

    methods: {
        handleKeyDown(e) {
            if (e.keyCode === 13)
                this.emitFilter();
        },
        emitFilter() {
            this.$emit('filter-update', { name: this.name, value: encodeURIComponent(this.$refs.filterinput.value) });
        },
    },

    emits: [ 'filter-update' ],
    updated() {
        this.emitFilter();
    },
}
</script>

<style>
    .container-filter {
        margin: 0.25em;
    }
</style>
