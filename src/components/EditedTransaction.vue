<template>
    <div class="background-blocker">
    </div>
    <div ref="container" data-cy="container-edit-transaction" class="edited-transaction-container">
        <div class="header">
            <InputWithAutoComplete
                data-cy="input-date"
                label="Date"
                ref="date"
                :value="transaction.date"
                @change="updateDate"
                type="date"
            />
            <InputWithAutoComplete
                data-cy="input-payee"
                label="Payee"
                ref="payee"
                :value="transaction.payee"
                @change="updatePayee"
            />
            <span v-if="unbalancedAmount != 0" class="span-unbalanced-amount">
                Unbalanced amount: <span data-cy="field-unbalanced-amount">{{ formattedUnbalancedAmount }}</span>
            </span>

        </div>
        <div class="entries">
            <div v-for="(entry, index) in transaction.entries" :key="entry.id">
                <EditedEntry
                    :account="entry.account"
                    :accountValidator="validateAccount"
                    :amount="entry.amount" 
                    :amountValidator="validateNumber"
                    :id="entry.id"
                    :ref="'entry'+index"
                    :shouldValidate="shouldValidate"
                    @update-entry="updateEntry"
                    @remove-entry="removeEntry"
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
import InputWithAutoComplete from './InputWithAutocomplete.vue'
import { nanoid } from 'nanoid'
import { numberToString } from '../helpers.js'
import Decimal from 'decimal.js'

export default {
    name: 'EditedTransaction',

    components: {
        EditedEntry,
        InputWithAutoComplete,
    },

    props: {
        date: String,
        entries: Array,
        id: Number,
        payee: String,
    },

    data() {
        return {
            shouldValidate: false,
            suggestions: ['Assets', 'Equity'],
            transaction: {},
            dateSuggestions: [],
            errorsList: [],
        }
    },

    computed: {
        unbalancedAmount: function() {
            let unbalanced = Decimal('0');

            this.transaction.entries.forEach(entry => {
                try {
                    unbalanced = unbalanced.plus(Decimal(entry.amount));
                } catch (e) {
                    unbalanced = unbalanced.plus('0');
                }
            });
            unbalanced = unbalanced.times('-1');

            return unbalanced;
        },

        formattedUnbalancedAmount: function() {
            return numberToString(this.unbalancedAmount);
        },
    },

    methods: {
        validate(value) {
            return value.toString().trim().length > 0 ? true : false;
        },
        validateAccount(value) {
            let topAccount = value.split(':')[0];
            let topAccountsNames = ['Assets', 'Liabilities', 'Expenses', 'Income', 'Equity'];
            if (topAccountsNames.includes(topAccount))
                return true;
            return false;
        },
        validateDate(value) {
            if (!this.validate(value))
                return false;
            if (!new Date(value))
                return false;
            return true;
        },
        validateNumber(value) {
            if (!this.validate(value))
                return false;

            try {
                value = new Decimal(value);
            } catch {
                return false;
            }
            return true;
        },
        transactionIsValid() {
            let isValid = true;
            this.errorsList = [];

            if (this.unbalancedAmount != 0) {
                this.errorsList.push('Amount is unbalanced');
                isValid = false;
            }

            if (!this.validateDate(this.transaction.date)) {
                isValid = false;
                this.$refs.date.markAsInvalid('Date is required');
            }

            if (!this.validate(this.transaction.payee)) {
                isValid = false;
                this.$refs.payee.markAsInvalid('Payee is required');
            }

            this.transaction.entries.forEach((entry, index) => {
                if (!this.validateAccount(entry.account)) {
                    isValid = false;
                    let errorMessage = '';
                    if (entry.account.length > 0)
                        errorMessage = 'Top account has to be Assets, Liabilities, Equity, Income or Expenses';
                    else
                        errorMessage = 'Account is required';

                    this.$refs['entry'+index].$refs.account.markAsInvalid(errorMessage);
                }

                if (!this.validateNumber(entry.amount)) {
                    isValid = false;
                    this.$refs['entry'+index].$refs.amount.markAsInvalid('Amount is invalid');
                }
            });

            return isValid;
        },
        saveTransaction() {
            if (this.transactionIsValid()) {
                this.$emit('save-transaction', this.transaction);
            }
            else
                this.shouldValidate = true;
        },
        cancelTransaction() {
            this.$emit('close-transaction');
        },
        deleteTransaction() {
            this.$emit('delete-transaction', this.transaction);
        },
        addEntry() {
            this.transaction.entries = [ ...this.transaction.entries, this.addIdToEntry(null)];
        },
        updateEntry(entry) {
            const index = this.transaction.entries.findIndex(e => e.id === entry.id);
            this.transaction.entries[index] = {...entry};
        },
        addIdToEntry(entry) {
            if (!entry)
                entry = { account: '', amount: '' };
            return { ...entry, id: nanoid() };
        },
        removeEntry(id) {
            if (this.transaction.entries.length == 2) {
                const index = this.transaction.entries.findIndex(e => e.id === id);
                this.transaction.entries[index] = { id: nanoid(), account: '', amount: '' };
            }
            else 
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
        this.transaction.entries = this.entries.map((entry) => {return this.addIdToEntry(entry)});
        this.dateSuggestions = this.getLastDays(4);
    },
    async mounted() {
        console.log('mounted');
        await this.$store.dispatch('fetchData');
    },

    emits: [ 'close-transaction', 'save-transaction', 'delete-transaction' ]
}

</script>

<style scoped>
    @keyframes slide-in-animation {
        from { top: -100pt; opacity: 0.5; }
        to { top: 5em; opacity: 1; }
    }

    .background-blocker {
        background-color: #aaaaaaaa;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 98;
    }

    .edited-transaction-container {
        animation-duration: 0.3s;
        animation-name: slide-in-animation;
        background-color: #fefefe;
        border: solid 1px #bbb;
        border-radius: 5px;
        box-shadow: 0px 0px 6px #666;
        display: grid;
        grid-gap: 0.5rem;
        grid-template-columns: 2fr 3fr;
        left: 0;
        margin: auto;
        max-width: 600pt;
        padding: 1em;
        padding-top: 2em;
        padding-bottom: 6em;
        position: fixed;
        right: 0;
        top: 5em;
        z-index: 99;
    }
 
    .header, .entries {
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .header p {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .buttons {
        left: 0;
        right: 0;
        bottom: 1em;
        display: flex;
        justify-content: center;
        position: absolute;
    }

    .edited-transaction-container button {
        border: 0pt;
        box-shadow: 2px 2px 4px #bbb;
        padding: 0.5em;
        margin: 0.5em;
        transition: all 0.2s;
    }

    .edited-transaction-container button:hover {
        filter: brightness(0.9);
    }

    .buttons button {
        width: 100px;
    }

    .span-unbalanced-amount {
        color: #a44;
        font-size: 10pt;
    }

    .btn-add-entry {
        width: 90%;
    }

@media only screen and (max-width: 640px) {
    @keyframes slide-in {
        from { left: -100%; right: 100% }
        to { left: 0; right: 0 }
    }

    .edited-transaction-container {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 10px;
        bottom: 10px;
        left: 10px;
        right: 10px;
        z-index: 99;
        animation-name: slide-in;
        animation-duration: 0.3s;
    }

    .entries {
        overflow-y: auto;
        padding-bottom: 6em;
        position: relative;
    }
}

</style>
