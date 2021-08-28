<template>
    <div class="container">
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
    </div>
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
        authToken() { return this.$store.getters.getAuthToken; },
        filters() { return this.$store.getters.getFilters; },
        transactions() { return this.$store.getters.allTransactions; },
    },

    methods: {
        editTransaction(id) {
            if (!this.editedTransaction) {
                const index = (this.transactions.findIndex(transaction => transaction.id === id));
                this.editedTransaction = this.transactions[index];
            }
            document.body.classList.add('blocked');
        },

        createNewTransaction() {
            this.editedTransaction = { date: '', payee: '',
                entries: [ {account: '', amount: ''}, {account: '', amount: ''} ] };
            document.body.classList.add('blocked');
        },

        closeEditedTransaction() {
            this.editedTransaction = null;
            document.body.classList.remove('blocked');
        },

        async updateFilters(filters) {
            this.$store.commit('setFilters', filters);
            await this.$store.dispatch('fetchData');
        },

        async saveEditedTransaction(transaction) {
            this.closeEditedTransaction();
            await this.$store.dispatch('saveTransaction', transaction);
            await this.$store.dispatch('fetchData');
        },

        async deleteEditedTransaction(transaction) {
            this.closeEditedTransaction();
            await this.$store.dispatch('deleteTransaction', transaction);
            await this.$store.dispatch('fetchData');
        },
    },
}

</script>
<style scoped>
   .btn-new-transaction {
        background-color: #4a9e56;
        border: 0px;
        border-radius: 25pt;
        box-shadow: 0px 0px 8px #aaa;
        bottom: 2em;
        color: #fefefe;
        font-size: 12pt;
        padding: 1.5em;
        position: fixed;
        right: 2em;
        z-index: 99;
    }

    .btn-new-transaction:hover {
        filter: brightness(0.9);
    }
</style>
