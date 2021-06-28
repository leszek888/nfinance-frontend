<template>
    <div v-bind:key="transaction.id" v-for="transaction in transactions">
        <Transaction @edit-transaction="$emit('edit-transaction', transaction.id)" :transaction="transaction" />
    </div>
</template>

<script>
import Transaction from './Transaction.vue'

export default {
    name: 'TransactionsList',
    components: {
        Transaction,
    },

    props: {
        transactions: Array
    },

    methods: {
        editTransaction(id) {
            console.log('Editing', id);
        },
    },

    emits: [ 'edit-transaction' ],
}
</script>

<style scoped>
    div {
        max-width: 1000px;
        margin: auto;
    }
</style>
