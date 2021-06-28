<template>
    <div class="edited-transaction-container">
        <div class="header">
            <p>Date: </p><input type="text" v-model="transaction.date"/>
            <p>Payee: </p><input type="text" v-model="transaction.payee" />
        </div>
        <div v-for="(entry, index) in transaction.entries" :key="index">
            <EditedEntry
                @update-entry="updateEntry"
                :account="entry.account"
                :amount="entry.amount" 
                :id="entry.id"
            />
        </div>
        <br />
        <button @click="saveTransaction">Save</button>
        <button @click="cancelTransaction">Cancel</button>
        <button @click="deleteTransaction">Delete</button>
    </div>
</template>

<script>
import EditedEntry from './EditedEntry.vue'
import { nanoid } from 'nanoid'

export default {
    name: 'EditedTransaction',

    components: {
        EditedEntry,
    },

    props: {
        id: Number,
        date: String,
        payee: String,
        entries: Array,
        balance_id: String,
    },

    data() {
        return {
            transaction: {},
        }
    },

    methods: {
        async saveTransaction() {
            const body = JSON.stringify({...this.transaction, balance_id: this.balance_id});
            await fetch('http://127.0.0.1:5000/api/transaction',
                {method: 'POST', mode: 'cors', body: body, headers: {'Content-Type':'application/json'}});
            this.$emit('close-transaction');
        },
        cancelTransaction() {
            this.$emit('close-transaction');
        },
        deleteTransaction() {
            console.log('Deleting: ', this.transaction.id);
            this.$emit('close-transaction');
        },
        updateEntry(entry) {
            const index = this.transaction.entries.findIndex(e => e.id === entry.id);
            this.transaction.entries[index] = {...entry};
        }
    },

    created() {
        this.transaction.id = this.id;
        this.transaction.date = this.date;
        this.transaction.payee = this.payee;
        this.transaction.entries = this.entries.map((entry) => {return {...entry, id: nanoid()}});
    },

    emits: [ 'close-transaction', 'save-transaction' ]
}

</script>

<style scoped>
    .edited-transaction-container {
        background-color: #fefefe;
        border: solid 1px #bbb;
        border-radius: 10px;
        box-shadow: 0px 0px 6px #aaa;
        left: 0;
        margin: auto;
        max-width: 600pt;
        padding: 1em;
        position: fixed;
        right: 0;
        top: 10%;
    }

    .header {
        display: grid;
        grid-template-columns: 60px 1fr;
    }

    .header p {
        vertical-align: middle;
        height: 100%;
    }

    .edited-transaction-container button {
        border: solid 1px #aaa;
        padding: 0.5em;
        width: 100px;
        margin: 0.25em;
    }
</style>
