<template>
    <Filters @filters-update="$emit('filters-update', $event)" />
    <div data-cy="container-transactions-list">
        <div v-bind:key="transaction.id" v-for="transaction in transactions">
            <Transaction @edit-transaction="$emit('edit-transaction', transaction.id)" :transaction="transaction" />
        </div>
    </div>
</template>

<script>
import Filters from './Filters.vue'
import Transaction from './Transaction.vue'

export default {
    name: 'TransactionsList',
    components: {
        Transaction,
        Filters,
    },

    props: {
        transactions: Array
    },

    methods: {
        editTransaction(id) {
            console.log('Editing', id);
        },
    },

    emits: [ 'edit-transaction', 'filters-update' ],
}
</script>

<style scoped>
    div {
        max-width: 1000pt;
        min-width: 320pt;
        margin: auto;
    }
</style>
