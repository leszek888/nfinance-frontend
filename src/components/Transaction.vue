<template>
    <div class="container" @click="handleClick">
        <span class="header">{{ transaction.date }}, {{ transaction.payee }}</span>
        <hr />
        <div v-for="(entry, index) in transaction.entries" :key="index">
            <Entry :account="entry.account" :amount="entry.amount" />
        </div>
    </div>
</template>

<script>
import Entry from './Entry.vue'

export default {
    name: 'Transaction',
    data() {
        return {
            newId: 0
        }
    },

    props: {
        transaction: Object,
    },

    components: {
        Entry,
    },

    methods: {
        handleClick() {
            this.$emit('edit-transaction', this.transaction.id);
        }
    },
}
</script>

<style scoped>
    .container {
        padding: 1.5em;
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
</style>
