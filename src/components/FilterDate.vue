<template>
    <FilterBox :title="title">
        <select v-model="currentPeriod" @change="updateSelection">
            <option v-for="period, index in periodes" v-bind:key="index">{{ period }}</option>
        </select>
        <div v-if="currentPeriod == 'Custom'">
            <input type="date" name="date_from" v-model="value_from" @change="emitAll" autocomplete="off"/>
            <input type="date" name="date_to" v-model="value_to" @change="emitAll" autocomplete="off" />
        </div>
    </FilterBox>
</template>
 
<script>
import FilterBox from './FilterBox.vue'

export default {
    name: 'FilterDate',
    data() {
        return {
            periodes: [ 'This Month', 'Last Month', 'This Year', 'All Time', 'Custom' ],
            currentPeriod: 'This Month',
            value_from: '',
            value_to: '',
        }
    },
    props: {
        value: String,
        title: String,
        name: String,
    },
    components: {
        FilterBox,
    },
    methods: {
       updateSelection() {
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

           this.value_from = date_from;

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
           this.value_to = date_to;
           this.emitAll();
       },

        emitAll() {
            if (this.currentPeriod === 'Custom' && (!this.value_from || !this.value_to))
                return;

            this.$emit('filter-update', [{name: 'date_from', value: this.value_from},
                                          {name: 'date_to', value: this.value_to}]);
        },
    },
    emits: [ 'filter-update', 'filters-update' ],
    mounted() {
        this.$nextTick(function() {this.updateSelection();});
    },
};
</script>

<style scoped>
    select {
        background: #fff;
        border: solid 1px #aaa;
        font-size: 11pt;
        padding: 4pt;
        width: 110pt;
    }

    input[type="date"] {
        appearance: none;
        background: #fff;
        border: solid 1px #888;
        color: #000;
        font-family: "Helvetica", arial, sans-serif;
        font-size: 11pt;
        margin: 2pt;
    }
</style>
