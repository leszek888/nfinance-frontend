<template>
    <FilterBox :title="title">
        <Filter :name="name" :value="value" @filter-update="$emit('filter-update', $event)"/>
    </FilterBox>
</template>
 
<script>
import FilterBox from './FilterBox.vue'
import Filter from './Filter.vue'

export default {
    name: 'FilterSimple',
    props: {
        value: String,
        title: String,
        name: String,
    },
    components: {
        Filter,
        FilterBox,
    },
    methods: {
        what(args) {
            console.log(args);
        },
        sec(args) {
            console.log(args);
        },
        /*
        updateFilter(data) {
            this.$emit('filter-update', data);
        },
        */
    },
    emits: [ 'filter-update' ],
};
</script>

