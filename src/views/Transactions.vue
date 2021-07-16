<template>
    <div v-if="!editedTransaction">
        <button data-cy="btn-new-transaction"
                class="btn-new-transaction"
                @click="createNewTransaction">
            New Transaction
        </button>
    </div>
    <div v-if="editedTransaction">
        <EditedTransaction
            @close-transaction="closeEditedTransaction"
            @save-transaction="saveEditedTransaction"
            @delete-transaction="deleteEditedTransaction"
            :key="editedTransaction.id"
            :id="editedTransaction.id"
            :date="editedTransaction.date"
            :payee="editedTransaction.payee"
            :entries="editedTransaction.entries"
        />
    </div>
    <TransactionsList @edit-transaction="editTransaction" @filters-update="updateFilters" :transactions="transactions" />
</template>

<script>
import TransactionsList from '@/components/TransactionsList.vue'
import EditedTransaction from '@/components/EditedTransaction.vue'

export default {
    name: 'Transactions',
    components: {
        TransactionsList,
        EditedTransaction,
    },

    data() {
        return {
            editedTransaction: null,
        }
    },

    computed: {
        transactions() { return this.$store.getters.allTransactions; },
        authToken() { return this.$store.getters.getAuthToken; },
        filters() { return this.$store.getter.getFilters; },
    },

    methods: {
        editTransaction(id) {
            if (!this.editedTransaction) {
                const index = (this.transactions.findIndex(transaction => transaction.id === id));
                this.editedTransaction = this.transactions[index];
            }
        },

        createNewTransaction() {
            this.editedTransaction = { date: '', payee: '',
                entries: [ {account: '', amount: ''}, {account: '', amount: ''} ] };
        },

        async updateFilters(filters) {
            this.$store.commit('setFilters', filters);
            await this.$store.dispatch('fetchTransactions');
        },

        async closeEditedTransaction() {
            this.editedTransaction = null;
        },

        async saveEditedTransaction(transaction) {
            this.closeEditedTransaction();
            await this.$store.dispatch('saveTransaction', transaction);
            await this.fetchTransactions();
        },

        async deleteEditedTransaction(transaction) {
            this.closeEditedTransaction();
            await this.sendApiRequest('transaction', 'DELETE', transaction);
            await this.fetchTransactions();
        },

        async fetchTransactions() {
            this.$store.dispatch('fetchTransactions');
            /*
            const response = await this.sendApiRequest('transaction?'+this.filters, 'GET');
            this.transactions = response['transactions'];
            console.log(this.transactions);
            */
        },
    },
}

</script>

