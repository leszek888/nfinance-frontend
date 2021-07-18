<template>
    <div class="account_row">
        {{ account.name }}, {{ account.balance }}<br />
    </div>
    <div v-for="sub_account, index in account.sub_accounts" :key="index">
        <div class="sub_arrow">
            x
        </div>
        <div class="sub_account">
            <account-row :account="sub_account" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AccountRow',

    props: {
        account: { type: Object, required: true },
    },
}
</script>

<style scoped>
    .account_row {
        border-top: solid 1px #ccc;
        padding: 0.3em;
    }
    .sub_arrow {
        border: solid 1px red;
    }
    .sub_account {
        padding-left: 1.5em;
    }
</style>
