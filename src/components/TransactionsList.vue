<template>
    <div data-cy="container-transactions-list" class="container-transactions-list">
        <Filters @filters-update="$emit('filters-update', $event)" />
        <div v-if="transactions && transactions.length > 0">
            <div v-bind:key="transaction.id" v-for="transaction in transactions">
                <Transaction @edit-transaction="$emit('edit-transaction', transaction.id)" :transaction="transaction" />
            </div>
        </div>
        <div v-if="transactions && transactions.length === 0">
            No transactions found.
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

    emits: [ 'edit-transaction', 'filters-update' ],
}
</script>

<style scoped>
    .container-transactions-list {
        display: grid;
        grid-row-gap: 1em;
        width: 100%;
    }
</style>
