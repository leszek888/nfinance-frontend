<template>
    <div class="filters-container">
        <label>Filters</label>
        <div class="filters-list">
            <FilterDate data-cy="filter-date" title="Date" name="date" @filter-update="updateFilters" />
            <FilterSimple data-cy="filter-payee" title="Payee" value="" name="payee" @filter-update="updateFilters" />
            <FilterSimple data-cy="filter-account" title="Account" value="" name="account" @filter-update="updateFilters" />
        </div>
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
        updateFilters(filters) {
            if (Array.isArray(filters))
                filters.forEach(filter => this.addFilter(filter));
            else
                this.addFilter(filters);
            this.emitFilters();
        },
        addFilter(updatedFilter) {
            for (let i=0; i!==this.filters.length; i++) {
                if (this.filters[i].name === updatedFilter.name) {
                    if (updatedFilter.value.length === 0) {
                        this.filters.splice(i, 1);
                        return;
                    }
                    else {
                        this.filters[i].value = updatedFilter.value;
                        return;
                    }

                }
            }
            if (updatedFilter.value.length > 0) {
                this.filters.push(updatedFilter);
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
        background-color: #fafafa;
        border: solid 1px #ddd;
        padding: 1em;
    }
    .filters-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 0.25em;
        position: relative;
    }

    @media only screen and (max-width: 780px) {
        .filters-list {
            grid-template-columns: 1fr;
        }
    }
</style>
