<template>
    <FilterBox :title="title">
        <Filter :name="name" :value="value" />
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
};
</script>

