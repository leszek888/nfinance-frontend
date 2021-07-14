<template>
    <FilterSimple data-cy="filter-payee" title="Payee" value="" name="payee" />
</template>

<script>
import FilterSimple from './FilterSimple.vue'

export default {
    name: 'Filters',
    components: {
        FilterSimple,
    },
}
</script>
