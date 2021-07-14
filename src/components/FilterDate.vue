<template>
    <FilterBox :title="title">
        <InputWithLabel
            :auto-complete="true"
            data-cy="filter-date-input"
            label=""
            :is-disabled="true"
            :suggestions-list="periodes"
            :value="currentPeriod"
            @change="updatePeriod"
        />
        <Filter name="date_from" :value="value_from" @filter-update="updateFilter"/>
        <Filter name="date_to" :value="value_to" @filter-update="updateFilter"/>
    </FilterBox>
</template>
 
<script>
import FilterBox from './FilterBox.vue'
import Filter from './Filter.vue'
import InputWithLabel from './InputWithLabel.vue'

export default {
    name: 'FilterDate',
    data() {
        return {
            periodes: [ 'This Month', 'Last Month', 'This Year', 'All Time', 'Custom' ],
            currentPeriod: '',
        }
    },
    computed: {
        value_from: function() {
            let date_from = new Date(Date.now());
            switch (this.currentPeriod) {
                case 'This Month':
                    date_from.setDate(1);
                    break;
                case 'Last Month':
                    date_from.setMonth(date_from.getMonth()-1);
                    date_from.setDate(1);
                    break;
                case 'This Year':
                    date_from.setDate(1);
                    date_from.setMonth(0);
                    break;
                default:
                    date_from = null;
                    break;
            }

            if (date_from)
                date_from = date_from.toLocaleDateString('en-CA');
            else
                date_from = '';
            return date_from;
        },
        value_to: function() {
            let date_to = new Date(Date.now());
            switch (this.currentPeriod) {
                case 'This Month':
                    break;
                case 'Last Month':
                    date_to.setDate(1);
                    date_to.setDate(date_to.getDate()-1);
                    break;
                case 'This Year':
                    break;
                default:
                    date_to = null;
                    break;
            }

            if (date_to)
                date_to = date_to.toLocaleDateString('en-CA');
            else
                date_to = '';
            return date_to;

        }
    },
    props: {
        value: String,
        title: String,
        name: String,
    },
    components: {
        Filter,
        FilterBox,
        InputWithLabel,
    },
    methods: {
       updateFilter(data) {
            this.$emit('filter-update', data);
        },
        updatePeriod(period) {
            console.log('updating period to: ', period);
            this.currentPeriod = period;
        },
    },
    emits: [ 'filter-update' ],
};
</script>

