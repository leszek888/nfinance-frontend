<template>
    <div class="account_row">
        <span>
            <div v-if="subAccountsArePresent">&nbsp;+&nbsp;</div>
            <div v-if="!subAccountsArePresent">&nbsp;&nbsp;&nbsp;</div>
            {{ account.name }}
        </span>
        <span>{{ formattedBalance }}</span>
    </div>
    <div v-for="sub_account, index in account.sub_accounts" :key="index">
        <div class="sub_account">
            <account-row :account="sub_account" />
        </div>
    </div>
</template>

<script>
import { numberToString } from '@/helpers.js'
export default {
    name: 'AccountRow',

    computed: {
        formattedBalance() { return numberToString(this.account.balance); },
        subAccountsArePresent() { return this.account.sub_accounts.length > 0; },
    },

    props: {
        account: { type: Object, required: true },
    },
}
</script>

<style scoped>
    span {
        display: flex;
    }

    .account_row {
        border-top: solid 1px #ccc;
        display: flex;
        justify-content: space-between;
        padding: 0.3em;
    }
    .sub_arrow {
        border: solid 1px red;
    }
    .sub_account {
        padding-left: 1.5em;
    }
</style>
