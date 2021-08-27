<template>
    <div data-cy="container-edited-entry" class="edited-entry-container">
        <div class="entry-row">
            <InputWithAutoComplete
                auto-complete-type="splitted"
                data-cy="input-account"
                label="Account"
                ref="account"
                :suggestions-list="getAccounts"
                :value="entry.account"
                @change="updateAccount"
                @focusout="updateEntry"
            />
            <InputWithLabel
                data-cy="input-amount"
                label="Amount"
                ref="amount"
                type="number"
                inputType="number"
                :value="entry.amount"
                @change="updateAmount"
                @focusout="updateEntry"
            />
        </div>
        <button @click="$emit('remove-entry', id)">X</button>
    </div>

</template>

<script>
import InputWithAutoComplete from './InputWithAutocomplete.vue'
import InputWithLabel from './InputWithLabel.vue'

export default {
    name: 'EditedEntry',

    components: {
        InputWithAutoComplete,
        InputWithLabel,
    },

    computed: {
        getAccounts() {
            let accounts = [];

            this.$store.getters.getAccounts.forEach(account => {
                accounts.push(account.name);
            });

            return accounts;
        },
    },

    props: {
        account: String,
        accountValidator: Function,
        amount: String,
        amountValidator: Function,
        id: String,
        shouldValidate: Boolean,
    },

    data() {
        return {
            entry: {
                account: this.account,
                amount: this.amount,
                id: this.id,
            },
        }
    },

    methods: {
        updateAccount(value) {
            this.entry.account = value;
        },
        updateAmount(value) {
            this.entry.amount = value;
        },
        updateEntry() {
            this.$emit('update-entry', this.entry);
        },
    },

    emits: [ 'update-entry', 'remove-entry' ]

}
</script>

<style scoped>
.edited-entry-container {
    display: grid;
    grid-template-columns: 1fr 25px;
    grid-column-gap: 0.3rem;
}

.entry-row {
    display: grid;
    grid-template-columns: 1fr 125px;
}

.edited-entry-container button {
    border: 1px solid #f4d9d9;
    border-radius: 5px;
    color: red;
    background-color: transparent;
    margin-top: 0.3rem;
    transition: all 0.3s;
}

.edited-entry-container button:hover {
    color: white;
    background-color: red;
 }

@media only screen and (max-width: 640px) {
    .entry-row {
        display: flex;
        flex-direction: column;
    }
}
</style>
