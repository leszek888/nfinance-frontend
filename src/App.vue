<template>
    <TransactionsList @edit-transaction="editTransaction" :transactions="transactions" />
    <div v-if="editedTransaction">
        <EditedTransaction
            @close-transaction="editedTransaction = null"
            @save-transaction="saveEditedTransaction"
            :key="editedTransaction.id"
            :id="editedTransaction.id"
            :date="editedTransaction.date"
            :payee="editedTransaction.payee"
            :entries="editedTransaction.entries"
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
            transactions: [
                { id: '1', date: '2020-01-01', payee: 'Pracodawca',
                    entries: [
                        {account: 'Aktywa:Obrotowe', amount: '2200.33'},
                        {account: 'Przychód:Wypłata', amount: '-2200.33'},
                    ]
                },
                { id: '2', date: '2020-01-02', payee: 'Biedronka',
                    entries: [
                        {account: 'Aktywa:Obrotowe', amount: '-15'},
                        {account: 'Wydatki:Codzienne', amount: '15'},
                    ]
                },
            ],
            editedTransaction: null,
        }
    },

    methods: {
        editTransaction(id) {
            const index = (this.transactions.findIndex(transaction => transaction.id === id));
            this.editedTransaction = this.transactions[index];
        },
        saveEditedTransaction(transaction) {
            const saved = JSON.parse(transaction);
            const index = (this.transactions.findIndex(t => t.id === saved.id));
            this.transactions[index] = saved;
            this.editedTransaction = null;
            console.log(this.transactions);
        }
    }
}
</script>

<style>
#app {
    font-family: sans-serif;
    position: relative;
}
</style>
