<template>
    <div ref="container" data-cy="container-edit-transaction" class="edited-transaction-container">
        <div class="header">
            <InputWithLabel
                :auto-complete="true"
                :suggestions-list="getLastDays(4)"
                data-cy="input-date"
                :value="transaction.date"
                @change="updateDate"
                :invalid="shouldValidate && !validateDate(transaction.date)"
                label="Date"/>
            <InputWithLabel
                data-cy="input-payee"
                :value="transaction.payee"
                @change="updatePayee"
                label="Payee"
                :invalid="shouldValidate && !validate(transaction.payee)"
            />
        </div>
        <div class="entries">
            <div v-for="(entry) in transaction.entries" :key="entry.id">
                <EditedEntry
                    @update-entry="updateEntry"
                    @remove-entry="removeEntry"
                    :account="entry.account"
                    :amount="entry.amount" 
                    :id="entry.id"
                    :shouldValidate="shouldValidate"
                    :accountValidator="validate"
                    :amountValidator="validateNumber"
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
import Decimal from 'decimal.js'

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
            shouldValidate: false,
        }
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
                const date_part = dateString.split('-');
                if (date_part.length != 3)
                    dateIsValid = false;

                const year = parseInt(date_part[0]);      
                const month= parseInt(date_part[1]);      
                const day = parseInt(date_part[2]);      
                      
                const list_of_days = [31,28,31,30,31,30,31,31,30,31,30,31];      

                if (day < 1)
                    dateIsValid = false;

                if (month >= 1 && month <= 12 && month != 2) {
                    if (day>list_of_days[month-1])
                        dateIsValid = false;
                }
                else if (month==2) {      
                    let leap_year = false;

                    if ( (!(year % 4) && year % 100) || !(year % 400))
                        leap_year = true;

                    if ((leap_year == false) && (day>=29))
                        dateIsValid = false;
                    else {
                        if ((leap_year==true) && (day>29)){
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
            if (!this.validateDate(this.transaction.date) ||
                !this.validate(this.transaction.payee))
                isValid = false;
            this.transaction.entries.forEach(entry => {
                if (!this.validate(entry.account) ||
                    !this.validateNumber(entry.amount))
                    isValid = false;
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
