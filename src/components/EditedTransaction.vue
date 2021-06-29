<template>
    <div class="edited-transaction-container">
        <div class="header">
            <InputWithLabel :value="transaction.date" @change="updateDate" label="Date"/>
            <InputWithLabel :value="transaction.payee" @change="updatePayee" label="Payee"/>
        </div>
        <div class="entries">
            <div v-for="(entry) in transaction.entries" :key="entry.id">
                <EditedEntry
                    @update-entry="updateEntry"
                    @remove-entry="removeEntry"
                    :account="entry.account"
                    :amount="entry.amount" 
                    :id="entry.id"
                />
            </div>
            <button class="btn-add-entry" @click="addEntry">Add Entry</button>
        </div>
        <br />
        <div class="buttons">
            <button @click="saveTransaction">Save</button>
            <button @click="cancelTransaction">Cancel</button>
            <button @click="deleteTransaction">Delete</button>
        </div>
    </div>
</template>

<script>
import EditedEntry from './EditedEntry.vue'
import InputWithLabel from './InputWithLabel.vue'
import { nanoid } from 'nanoid'

export default {
    name: 'EditedTransaction',

    components: {
        EditedEntry,
        InputWithLabel,
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
        saveTransaction() {
            this.$emit('save-transaction', this.transaction);
            
        },
        cancelTransaction() {
            this.$emit('close-transaction');
        },
        deleteTransaction() {
            this.$emit('delete-transaction', this.transaction);
        },
        addEntry() {
            this.transaction.entries = [ ...this.transaction.entries, this.parseEntry(null)];
        },
        updateEntry(entry) {
            const index = this.transaction.entries.findIndex(e => e.id === entry.id);
            this.transaction.entries[index] = {...entry};
        },
        parseEntry(entry) {
            if (!entry)
                entry = { account: '', amount: '' };
            return { ...entry, id: nanoid() };
        },
        removeEntry(id) {
            console.log('Removing entry with id: ', id);
            this.transaction.entries = this.transaction.entries.filter(entry => entry.id !== id);
        },
        updatePayee(value) {
            this.transaction.payee = value;
        },
        updateDate(value) {
            this.transaction.date = value;
        },
    },

    created() {
        this.transaction.id = this.id;
        this.transaction.date = this.date;
        this.transaction.payee = this.payee;
        this.transaction.entries = this.entries.map((entry) => {return this.parseEntry(entry)});
    },

    emits: [ 'close-transaction', 'save-transaction', 'delete-transaction' ]
}

</script>

<style scoped>
    @keyframes display-animation {
        from { top: 0; opacity: 0.5; }
        to { top: 10%; opacity: 1; }
    }

    .edited-transaction-container {
        background-color: #fefefe;
        border: solid 1px #bbb;
        border-radius: 10px;
        box-shadow: 0px 0px 6px #aaa;
        left: 0;
        margin: auto;
        max-width: 600pt;
        padding: 1em;
        padding-bottom: 4em;
        position: fixed;
        right: 0;
        top: 10%;
        animation-name: display-animation;
        animation-duration: 0.3s;
        display: grid;
        grid-template-columns: 2fr 3fr;
        grid-gap: 10pt;
        z-index: 99;
    }

    .header {
        display: flex;
        flex-direction: column;
    }

    .header p {
        padding: 0;
        margin: 0;
        height: 100%;
    }

    .buttons {
        position: absolute;
        bottom: 1em;
        left: 1em;
    }

    .edited-transaction-container button {
        border: solid 1px #aaa;
        padding: 0.5em;
        margin: 0.25em;
    }

    .buttons button {
        width: 100px;
    }

    .btn-add-entry {
        width: 100%;
    }

</style>
