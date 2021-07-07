<template>
    <div data-cy="container-edit-transaction" class="edited-transaction-container">
        <div class="header">
            <InputWithLabel
                :auto-complete="true"
                :suggestions-list="getLastDays(4)"
                data-cy="input-date"
                :value="transaction.date"
                @change="updateDate"
                :required="true"
                label="Date"/>
            <InputWithLabel data-cy="input-payee" :value="transaction.payee" @change="updatePayee" label="Payee" :required="true"/>
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
            <button data-cy="btn-add-entry" class="btn-add-entry" @click="addEntry">Add Entry</button>
        </div>
        <br />
        <div class="buttons">
            <button data-cy="btn-save-transaction" @click="saveTransaction">Save</button>
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
            suggestions: ['Assets', 'Equity'],
        }
    },

    methods: {
        validate(value) {
            return value.toString().trim().length > 0 ? true : false;
        },
        transactionIsValid() {
            if (!this.validate(this.transaction.date) ||
                !this.validate(this.transaction.payee))
                return false;
            this.transaction.entries.forEach(entry => {
                if (!this.validate(entry.account) ||
                    !this.validate(entry.amount))
                    return false;
            });

            return true;
        },
        saveTransaction() {
            if (this.transactionIsValid())
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
            this.transaction.entries = this.transaction.entries.filter(entry => entry.id !== id);
        },
        updatePayee(value) {
            this.transaction.payee = value;
        },
        updateDate(value) {
            this.transaction.date = value;
        },
        getLastDays(numberOfDays) {
            const dateNow = new Date(Date.now());
            const lastDaysArray = [];
            const convertToDoubleDigits = (str) => { return str.toString().length === 2 ? str.toString() : '0'+str.toString() };

            for (let i = 0; i !== numberOfDays; i++) {
                let dateString = dateNow.getFullYear() + '-'
                                + convertToDoubleDigits(dateNow.getMonth()+1) + '-'
                                + convertToDoubleDigits(dateNow.getDate());
                lastDaysArray.push(dateString);
                dateNow.setDate(dateNow.getDate() - 1);
            }

            return lastDaysArray;
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
        from { top: -100pt; opacity: 0.5; }
        to { top: 30pt; opacity: 1; }
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
        top: 30pt;
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
        /*border: solid 1px #aaa;*/
        border: 0pt;
        box-shadow: 2px 2px 4px #bbb;
        padding: 0.5em;
        margin: 0.25em;
        transition: all 0.2s;
    }

    .edited-transaction-container button:hover {
        filter: brightness(0.9);
    }

    .buttons button {
        width: 100px;
    }

    .btn-add-entry {
        width: 100%;
    }

</style>
