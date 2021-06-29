<template>
    <div class="container">
        <div class="header">{{ transaction.date }}, {{ transaction.payee }}</div>
        <div :class="[assetValue > 0 && 'positive-balance',
                  assetValue < 0 && 'negative-balance']"
            v-for="(entry, index) in transaction.entries" :key="index">
            <Entry :account="entry.account" :amount="entry.amount" />
        </div>
        <button @click="$emit('edit-transaction', transaction.id)" class="btn-edit-transaction">Edit</button>
    </div>
</template>

<script>
import Entry from './Entry.vue'

export default {
    name: 'Transaction',
    data() {
        return {
            assetValue: 0,
        }
    },

    props: {
        transaction: Object,
    },

    components: {
        Entry,
    },

    created() {
        const assets_entries = this.transaction.entries.filter(entry => entry.account.startsWith('A'));
        this.assetValue = 0;

        assets_entries.forEach(entry => {
            const convertedEntry = parseInt(parseFloat(entry.amount)*100);
            this.assetValue += convertedEntry;
        });
    },

    emits: [ 'edit-transaction' ],
}
</script>

<style scoped>
    .container {
        background-color: #fefefe;
        border-top: solid 1px #ddd;
        margin: 5px;
        padding: 1em 2em 1em 2em;
        position: relative;
        transition: all 0.3s ease-out;
    }

    .container:hover {
        background-color: #fcfcfc;
        box-shadow: 0px 0px 5px #444;
    }

    .header {
        font-size: 16pt;
        padding-bottom: 0.3em;
    }

    h3 {
        font-size: 11pt;
    }

    .container .btn-edit-transaction {
        background-color: #f0f0f0;
        border: 0px;
        border-radius: 10px;
        display: none;
        padding: 0.6em;
        position: absolute;
        right: 1em;
        top: 0.5em;
        width: 100px;
    }

    .container:hover .btn-edit-transaction {
        display: initial;
    }

    .btn-edit-transaction:hover {
        background-color: #ddd;
    }

    .positive-balance {
        color: #32821f;
    }

    .negative-balance {
        color: #994343;
    }
</style>
