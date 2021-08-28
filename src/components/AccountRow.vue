<template>
    <div @click="isCollapsed = !isCollapsed" class="account-row" data-cy="account-row">
        <span>
            <div v-if="subAccountsArePresent">
                <div v-if="isCollapsed"><font-awesome-icon icon="plus-square" class="icons" />&nbsp;</div>
                <div v-if="!isCollapsed"><font-awesome-icon icon="minus-square" class="icons" />&nbsp;</div>
            </div>
            <div v-if="!subAccountsArePresent">&nbsp;&nbsp;&nbsp;</div>
            {{ account.name }}
        </span>
        <span>{{ formattedBalance }}</span>
    </div>
    <div v-if="!isCollapsed">
        <div v-for="sub_account, index in account.sub_accounts" :key="index">
            <div class="sub-account">
                <account-row :account="sub_account" :collapsed="collapsed" />
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
            isCollapsed: this.collapsed,
        }
    },

    computed: {
        formattedBalance() { return numberToString(this.account.balance); },
        subAccountsArePresent() { return this.account.sub_accounts.length > 0; },
    },

    props: {
        account: { type: Object, required: true },
        collapsed: { type: Boolean, default: false, required: false },
    },
}
</script>

<style scoped>
    span {
        display: flex;
    }

    .account-row {
        border-top: solid 1px #ccc;
        display: flex;
        justify-content: space-between;
        padding: 0.3em;
        transition: all 0.2s;
    }
    .account-row:hover {
        background-color: #eee;
        cursor: pointer;
        font-weight: bold;
    }
    .sub-arrow {
        border: solid 1px red;
    }
    .sub-account {
        padding-left: 1em;
    }
    .icons {
        color: #aaa;
    }

    @media only screen and (max-width: 640px) {
        .account-row {
            padding: 0.6em 0em;
        }
        .sub-account {
            padding-left: 0.5em;
        }
    }
</style>
