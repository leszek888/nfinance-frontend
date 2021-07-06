<template>
    <div data-cy="container-edited-entry" class="edited-entry-container">
        <InputWithLabel
            :auto-complete="true"
            :suggestions-list="['Assets:Current:Bank', 'Assets:Fixed:Cash', 'Equity', 'Liabilities']"
            :value="entry.account"
            @change="updateAccount"
            @focusout="updateEntry"
            label="Account"
            data-cy="input-account"
        />
        <InputWithLabel
            type="number"
            :value="entry.amount"
            @change="updateAmount"
            @focusout="updateEntry"
            label="Amount"
            data-cy="input-amount"
        />
        <button @click="$emit('remove-entry', id)">X</button>
    </div>
</template>

<script>
import InputWithLabel from './InputWithLabel.vue'

export default {
    name: 'EditedEntry',

    components: {
        InputWithLabel,
    },

    props: {
        account: String,
        amount: String,
        id: String,
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
        updateEntry() {
            this.$emit('update-entry', this.entry);
        },
        updateAccount(value) {
            this.entry.account = value;
        },
        updateAmount(value) {
            this.entry.amount = value;
        },
    },

    emits: [ 'update-entry', 'remove-entry' ]

}
</script>

<style scoped>
.edited-entry-container {
    display: grid;
    grid-template-columns: 1fr 125px 25px;
}

.edited-entry-container button {
    border: 0px;
    color: red;
    background-color: transparent;
    transition: all 0.3s;
}

.edited-entry-container button:hover {
    color: white;
    background-color: red;
}
</style>
