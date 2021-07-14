<template>
    <div class="filters-container">
        <FilterSimple data-cy="filter-payee" title="Payee" value="" name="payee" @filter-update="updateFilters" />
    </div>
</template>

<script>
import FilterSimple from './FilterSimple.vue'

export default {
    name: 'Filters',
    data() {
        return {
            filters: [],
        };
    },
    computed: {
        filtersString() {
            let string = '';
            this.filters.forEach((filter, index) => {
                if (index > 0)
                    string += '&';
                string += `${filter.name}=${filter.value}`;
            });
            return string;
        },
    },
    components: {
        FilterSimple,
    },
    methods: {
        updateFilters(updatedFilter) {
            console.log('Filters called updateFilter with: ', updatedFilter);
            for (let i=0; i!==this.filters.length; i++) {
                if (this.filters[i].name === updatedFilter.name) {
                    if (updatedFilter.value.length === 0) {
                        this.filters.splice(i, 1);
                        this.emitFilters();
                        return;
                    }
                    else {
                        this.filters[i].value = updatedFilter.value;
                        this.emitFilters();
                        return;
                    }

                }
            }
            this.filters.push(updatedFilter);
            this.emitFilters();
        },
        emitFilters() {
            console.log('emitting filters with: ', this.filtersString);
            this.$emit('filters-update', this.filtersString);
        },
    },
    emits: ['filters-update'],
}
</script>

<style>
    .filters-container {
        display: flex;
    }
</style>
