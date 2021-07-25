<template>
    <div @click="collapsed = !collapsed" class="account_row" data-cy="account-row">
        <span>
            <div v-if="subAccountsArePresent">
                <div v-if="collapsed"><font-awesome-icon icon="plus-square" class="icons" />&nbsp;</div>
                <div v-if="!collapsed"><font-awesome-icon icon="minus-square" class="icons" />&nbsp;</div>
            </div>
            <div v-if="!subAccountsArePresent">&nbsp;&nbsp;&nbsp;</div>
            {{ account.name }}
        </span>
        <span>{{ formattedBalance }}</span>
    </div>
    <div v-if="!collapsed">
        <div v-for="sub_account, index in account.sub_accounts" :key="index">
            <div class="sub_account">
                <account-row :account="sub_account" />
            </div>
        </div>
    </div>
</template>

<script>
import { numberToString } from '@/helpers.js'
export default {
    name: 'AccountRow',

    data() {
        return {
            collapsed: false,
        }
    },

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
        transition: all 0.2s;
    }
    .account_row:hover {
        background-color: #eee;
        cursor: pointer;
        font-weight: bold;
    }
    .sub_arrow {
        border: solid 1px red;
    }
    .sub_account {
        padding-left: 1em;
    }
    .icons {
        color: #aaa;
    }
</style>
