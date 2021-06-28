<template>
    <div class="container">
        <span class="header">{{ transaction.date }}, {{ transaction.payee }}</span>
        <hr />
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
            newId: 0,
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
        padding: 1.5em;
        position: relative;
        border-radius: 6px;
        background-color: #f5f5f5;
        margin: 5px;
        transition: all 0.3s ease-out;
    }

    .container:hover {
        background-color: #fcfcfc;
        box-shadow: 0px 0px 5px #444;
    }

    .header {
        font-size: 16pt;
    }

    h3 {
        font-size: 11pt;
    }

    .container .btn-edit-transaction {
        background-color: #f0f0f0;
        border: 0px;
        border-radius: 50%;
        display: none;
        padding: 1em;
        position: absolute;
        right: 1em;
        top: 0.5em;
    }

    .container:hover .btn-edit-transaction {
        display: initial;
    }

    .positive-balance {
        color: #32821f;
    }

    .negative-balance {
        color: #82201f;
    }
</style>
