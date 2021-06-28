<template>
    <TransactionsList @edit-transaction="editTransaction" :transactions="transactions" />
    <div v-if="editedTransaction">
        <EditedTransaction
            @close-transaction="closeEditedTransaction"
            @save-transaction="saveEditedTransaction"
            :key="editedTransaction.id"
            :id="editedTransaction.id"
            :date="editedTransaction.date"
            :payee="editedTransaction.payee"
            :entries="editedTransaction.entries"
            :balance_id="balance_id"
        />
    </div>
</template>

<script>
import TransactionsList from './components/TransactionsList.vue'
import EditedTransaction from './components/EditedTransaction.vue'

export default {
    name: 'App',
    components: {
        TransactionsList,
        EditedTransaction,
    },

    data() {
        return {
            transactions: [],
            editedTransaction: null,
            balance_id: 'd2d9fa10-c1c1-4d59-8074-2bb20c6358c3',
        }
    },

    methods: {
        editTransaction(id) {
            const index = (this.transactions.findIndex(transaction => transaction.id === id));
            this.editedTransaction = this.transactions[index];
        },

        async closeEditedTransaction() {
            await this.fetchTransactions();
            this.editedTransaction = null;
        },

        saveEditedTransaction() {
        },

        async fetchTransactions() {
            const response = await fetch('http://127.0.0.1:5000/api/transaction?bal_id='+this.balance_id,
                {method: 'GET', mode: 'cors'})
            const data = await response.json();
            this.transactions = data['transactions'];
        },
    },

    async created() {
        this.fetchTransactions();
    },
}
</script>

<style>
#app {
    font-family: sans-serif;
    position: relative;
}
</style>
