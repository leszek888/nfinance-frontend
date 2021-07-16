<template>
    <FilterBox :title="title">
        <select ref="periodselect" @change="updatePeriod">
            <option v-for="period, index in periodes" v-bind:key="index">{{ period }}</option>
        </select>
        <Filter ref="from" name="date_from" :value="value_from" @filter-update="updateFilter"/>
        <Filter ref="to" name="date_to" :value="value_to" @filter-update="updateFilter"/>
    </FilterBox>
</template>
 
<script>
import FilterBox from './FilterBox.vue'
import Filter from './Filter.vue'

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
    },
    methods: {
       updateFilter(data) {
           this.$emit('filter-update', data);
        },
        updatePeriod() {
            this.currentPeriod = this.$refs.periodselect.value;
            this.emitAll();
        },
        emitAll() {
            this.$emit('filter-update', [{name: 'date_from', value: this.value_from},
                                          {name: 'date_to', value: this.value_to}]);
        },
    },
    emits: [ 'filter-update', 'filters-update' ],
    mounted() {
        this.$nextTick(function() {this.updatePeriod();});
    },
};
</script>

<style scoped>
    select {
        width: 110pt;
        border: solid 1px #aaa;
        font-size: 11pt;
        padding: 4pt;
    }
</style>
