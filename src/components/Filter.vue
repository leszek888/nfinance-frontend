<template>
    <div data-cy="container-filter" :name="name">
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
            this.$emit('filter-update', { name: this.name, value: this.$refs.filterinput.value });
        },
    },

    emits: [ 'filter-update' ],
    updated() {
        this.emitFilter();
    },
}
</script>

