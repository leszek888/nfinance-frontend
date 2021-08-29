<template>
    <FilterBox :title="title">
        <div>
            <select v-model="currentPeriod" @change="updateSelection">
                <option v-for="period, index in periodes" v-bind:key="index">{{ period }}</option>
            </select>
            <div v-if="currentPeriod == 'Custom'">
                <div class="date-selector">
                    From: <input type="date" data-cy="date-from" name="date_from" v-model="value_from" @change="emitAll" autocomplete="off"/>
                </div>
                <div class="date-selector">
                    To: <input type="date" data-cy="date-to" name="date_to" v-model="value_to" @change="emitAll" autocomplete="off" />
                </div>
            </div>
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
            currentPeriod: this.selectedPeriod ? this.selectedPeriod : 'This Month',
            value_from: '',
            value_to: '',
        }
    },
    props: {
        value: String,
        title: String,
        name: String,
        selectedPeriod: String,
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
            this.$emit('filter-update', [{name: 'date_from', value: this.value_from},
                                          {name: 'date_to', value: this.value_to}]);
        },
    },
    emits: [ 'filter-update' ],
    mounted() {
        this.$nextTick(function() {this.updateSelection();});
    },
};
</script>

<style scoped>
    .date-selector {
        align-items: center;
        display: grid;
        grid-template-columns: 40pt 1fr;
        font-size: 10pt;
        padding-left: 0.2em;
        padding-top: 0.2em;
        text-align: left;
    }
</style>
