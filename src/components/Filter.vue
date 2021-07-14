<template>
    <div data-cy="container-filter" :name="name">
        <input @keydown="handleKeyDown" @blur="emitFilter" :value="value" />
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
                this.emitFilter(e);
        },
        emitFilter(e) {
            console.log('Filter emitting filter: ', this.name, e.target.value);
            this.$emit('filter-update', { name: this.name, value: e.target.value });
        }
    },

    emits: [ 'filter-update' ],
}
</script>
