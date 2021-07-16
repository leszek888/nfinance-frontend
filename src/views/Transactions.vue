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
            transactions: [],
            editedTransaction: null,
            filters: '',
        }
    },

    computed: {
        authToken() { return this.$store.getters.getAuthToken; },
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
            this.filters = filters;
            await this.fetchTransactions();
        },

        async sendApiRequest(url, method, data) {
            console.log('ApiRequest: ', url, ', ', method, ', ', data);
            let headers = new Headers();
            headers.append('x-access-token', this.authToken);
            headers.append('Content-Type', 'application/json');

            let body = null;
            if (method !== 'GET')
                body = JSON.stringify(data);

            const response = await fetch('http://127.0.0.1:5000/api/'+url,
                {method: method, mode: 'cors', headers: headers, body: body})

            const json = await response.json();

            if ('message' in json || 'error' in json) {
                console.log(json);
            }
            return json;
        },

        async closeEditedTransaction() {
            this.editedTransaction = null;
        },

        async saveEditedTransaction(transaction) {
            this.closeEditedTransaction();
            await this.sendApiRequest('transaction', 'POST', transaction);
            await this.fetchTransactions();
        },

        async deleteEditedTransaction(transaction) {
            this.closeEditedTransaction();
            await this.sendApiRequest('transaction', 'DELETE', transaction);
            await this.fetchTransactions();
        },

        async fetchTransactions() {
            const response = await this.sendApiRequest('transaction?'+this.filters, 'GET');
            this.transactions = response['transactions'];
            console.log(this.transactions);
        },

    },
}

</script>

