<template>
    <div v-if="!editedTransaction">
        <button class="btn-new-transaction" @click="createNewTransaction">New Transaction</button>
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
            :balance_id="balance_id"
        />
    </div>
    <TransactionsList @edit-transaction="editTransaction" :transactions="transactions" />
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
            auth_token: null,
        }
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

        async sendApiRequest(url, method, data) {
            let headers = new Headers();
            headers.append('x-access-token', this.auth_token);
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
            await this.fetchTransactions();
            this.editedTransaction = null;
        },

        async saveEditedTransaction(transaction) {
            await this.sendApiRequest('transaction', 'POST', transaction);
            this.closeEditedTransaction();
        },

        async deleteEditedTransaction(transaction) {
            await this.sendApiRequest('transaction', 'DELETE', transaction);
            this.closeEditedTransaction();
        },

        async fetchTransactions() {
            const response = await this.sendApiRequest('transaction', 'GET');
            this.transactions = response['transactions'];
        },
    },

    async created() {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(this.balance_id + ':pw'))
        const response = await fetch('http://127.0.0.1:5000/api/auth', {method: 'GET', headers: headers, mode: 'cors'});
        const data = await response.json();
        this.auth_token = data['token'];
        this.fetchTransactions();
    },
}
</script>

<style>
#app {
    font-family: sans-serif;
    position: relative;
    color: #555;
}

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
