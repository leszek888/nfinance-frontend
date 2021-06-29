<template>
    <div class="entry-container">
        <div class="account">{{ account }}</div>
        <div class="amount">{{ formatedNumber }}</div>
    </div>
</template>

<script>
import { formatNumber } from './../helpers.js'

export default {
    name: 'Entry',
    props: {
        account: String,
        amount: String,
    },
    computed: {
        formatedNumber: function() {
            return (formatNumber(this.amount));
        }
    },
}
</script>

<style scoped>
    .entry-container {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    .entry-container .account {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
