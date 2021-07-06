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
            //balance_id: 'd2d9fa10-c1c1-4d59-8074-2bb20c6358c3',
            //balance_id: this.$route.query.balance_id,
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
            console.log('request data: ', data);
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
            const response = await this.sendApiRequest('transaction', 'GET');
            this.transactions = response['transactions'];
        },

        async getTokenFromBalanceId(id) {
            let headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(id + ':pw'))
            const response = await fetch('http://127.0.0.1:5000/api/auth', {method: 'GET', headers: headers, mode: 'cors'});
            const data = await response.json();
            return data['token'];
        },
    },

    async created() {
        const params = new URLSearchParams(window.location.search.substring(1));
        this.balance_id = params.get('balance_id');
        if (this.balance_id) {
            this.auth_token = await this.getTokenFromBalanceId(this.balance_id);
            this.fetchTransactions();
        }
        else {
            const response = await this.sendApiRequest('balance/new', 'GET');
            this.balance_id = response['balance_id'];
            window.location.href = "/?balance_id="+this.balance_id;
        }
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
