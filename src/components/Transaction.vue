<template>
    <div data-cy="container-transaction" class="container-transaction">
        <div class="header">{{ transaction.date }}, {{ transaction.payee }}</div>
        <div
            v-for="(entry, index) in transaction.entries"
            :key="index">
            <Entry :account="entry.account" :amount="entry.amount" />
        </div>
        <button data-cy="btn-edit-transaction" @click="$emit('edit-transaction', transaction.id)" class="btn-edit-transaction">Edit</button>
    </div>
</template>

<script>
import Entry from './Entry.vue'

export default {
    name: 'Transaction',

    props: {
        transaction: Object,
    },

    components: {
        Entry,
    },

    emits: [ 'edit-transaction' ],
}
</script>

<style scoped>
    .container-transaction {
        background-color: #fefefe;
        border-top: solid 1px #ddd;
        margin-top: 0.5em;
        padding: 1em;
        position: relative;
        text-align: left;
        transition: all 0.3s;
        box-shadow: 0px 0px 5px transparent;
    }

    .container-transaction:hover {
        background-color: #fcfcfc;
        box-shadow: 0px 0px 5px #444;
    }

    .header {
        font-size: 14pt;
        padding-bottom: 0.3em;
    }

    .container-transaction .btn-edit-transaction {
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

    .container-transaction:hover .btn-edit-transaction {
        display: initial;
    }

    .btn-edit-transaction:hover {
        background-color: #ddd;
    }

</style>

