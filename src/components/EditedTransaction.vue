<template>
    <div ref="container" data-cy="container-edit-transaction" class="edited-transaction-container">
        <div class="header">
            <InputWithLabel
                :auto-complete="true"
                data-cy="input-date"
                label="Date"
                ref="date"
                :suggestions-list="getLastDays(4)"
                :value="transaction.date"
                @change="updateDate"
            />
            <InputWithLabel
                data-cy="input-payee"
                label="Payee"
                ref="payee"
                :value="transaction.payee"
                @change="updatePayee"
            />
        </div>
        <div class="entries">
            <div v-for="(entry, index) in transaction.entries" :key="entry.id">
                <EditedEntry
                    :account="entry.account"
                    :accountValidator="validate"
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
            <span v-if="unbalancedAmount != 0" class="span-unbalanced-amount">
                Unbalanced amount: <span data-cy="field-unbalanced-amount">{{ formattedUnbalancedAmount }}</span>
            </span>
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
import { numberToString } from '../helpers.js'
import Decimal from 'decimal.js'

export default {
    name: 'EditedTransaction',

    components: {
        EditedEntry,
        InputWithLabel,
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
        validateDate(value) {
            if (!this.validate(value))
                return false;

            const dateFormat = /^(\d{4})(-)(\d{1,2})(-)(\d{1,2})$/;
            let dateString = value.trim();
            let dateIsValid = true;

            if(dateString.match(dateFormat)){      
                const datePart = dateString.split('-');
                if (datePart.length != 3)
                    dateIsValid = false;

                const year = parseInt(datePart[0]);      
                const month= parseInt(datePart[1]);      
                const day = parseInt(datePart[2]);      
                      
                const listOfDays = [31,28,31,30,31,30,31,31,30,31,30,31];      

                if (day < 1)
                    dateIsValid = false;

                if (month >= 1 && month <= 12 && month != 2) {
                    if (day>listOfDays[month-1])
                        dateIsValid = false;
                }
                else if (month==2) {      
                    let leapYear = false;

                    if ( (!(year % 4) && year % 100) || !(year % 400))
                        leapYear = true;

                    if ((leapYear == false) && (day>=29))
                        dateIsValid = false;
                    else {
                        if ((leapYear==true) && (day>29)){
                            dateIsValid = false;
                        }
                    }
                }
                else
                    dateIsValid = false;
            }
            else {
                dateIsValid = false;
            }

            return dateIsValid;

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

            if (this.unbalancedAmount != 0)
                isValid = false;

            if (!this.validateDate(this.transaction.date)) {
                isValid = false;
                this.$refs.date.markAsInvalid();
            }

            if (!this.validate(this.transaction.payee)) {
                isValid = false;
                this.$refs.payee.markAsInvalid();
            }

            this.transaction.entries.forEach((entry, index) => {
                if (!this.validate(entry.account)) {
                    isValid = false;
                    this.$refs['entry'+index].$refs.account.markAsInvalid();
                }

                if (!this.validateNumber(entry.amount)) {
                    isValid = false;
                    this.$refs['entry'+index].$refs.amount.markAsInvalid();
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
        to { top: 5em; opacity: 1; }
    }

    .edited-transaction-container {
        animation-duration: 0.3s;
        animation-name: display-animation;
        background-color: #fefefe;
        border: solid 1px #bbb;
        border-radius: 10px;
        box-shadow: 0px 0px 6px #aaa;
        display: grid;
        grid-gap: 10pt;
        grid-template-columns: 2fr 3fr;
        left: 0;
        margin: auto;
        max-width: 600pt;
        padding: 1em;
        padding-bottom: 4em;
        position: fixed;
        right: 0;
        top: 5em;
        z-index: 99;
    }

    .header {
        display: flex;
        flex-direction: column;
    }

    .header p {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .buttons {
        bottom: 1em;
        left: 1em;
        position: absolute;
    }

    .edited-transaction-container button {
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

    .span-unbalanced-amount {
        bottom: 2em;
        color: #a44;
        font-size: 10pt;
        position: absolute;
        right: 3.5em;
    }

</style>
