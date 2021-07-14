<template>
    <div class="filters-container">
        <FilterDate data-cy="filter-date" title="Date" name="date" @filter-update="updateFilters" />
        <FilterSimple data-cy="filter-payee" title="Payee" value="" name="payee" @filter-update="updateFilters" />
        <FilterSimple data-cy="filter-account" title="Account" value="" name="account" @filter-update="updateFilters" />
    </div>
</template>

<script>
import FilterDate from './FilterDate.vue'
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
        FilterDate,
    },
    methods: {
        updateFilters(updatedFilter) {
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
            if (updatedFilter.value.length > 0) {
                this.filters.push(updatedFilter);
                this.emitFilters();
            }
        },
        emitFilters() {
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
