<template>
    <FilterBox>
        <Filter name="test" value="val" />
    </FilterBox>
</template>
 
<script>
import FilterBox from './FilterBox.vue'
import Filter from './Filter.vue'

export default {
    name: 'FilterSimple',
    components: {
        Filter,
        FilterBox,
    },
};
</script>

