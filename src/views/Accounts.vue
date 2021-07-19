<template>
    <div class="container" data-cy="container-accounts">
        <div v-if="accounts && accounts.length > 0">
            <div v-for="account, index in accounts" :key="index">
                <account-row :account="account" />
            </div>
        </div>
        <div v-if="!accounts || accounts.length === 0">
            No accounts found.
        </div>
    </div>
</template>

<script>
import AccountRow from '@/components/AccountRow.vue'

export default {
    name: 'Accounts',

    components: {
        AccountRow,
    },

    computed: {
        accounts() { 
            let parsedAccounts = [];

            this.$store.getters.getAccounts.forEach(account => {
                let sub_accounts = account['name'].split(':');

                this.parseSubAccounts(sub_accounts, parseFloat(account['balance']), parsedAccounts, 0);
            });

            return parsedAccounts;
        },
    },

    methods: {
        parseSubAccounts(accounts, balance, array, depth) {
            let account = {};
            let account_found = false;

            account['name'] = accounts.shift();
            account['balance'] = balance;
            account['sub_accounts'] = [];

            array.forEach(element => {
                if (element['name'] == account['name']) {
                    account_found = true;
                    element['balance'] += account['balance'];
                    this.parseSubAccounts(accounts, balance, element['sub_accounts'], depth+1);
                }
            });

            if (!account_found) {
                array.push(account);
                if (accounts.length > 0)
                    this.parseSubAccounts(accounts, balance, account['sub_accounts'], depth+1);
            }
        }


    },

    mounted() {
        this.$store.dispatch('fetchData');
    },
}
</script>

<style>
    .container {
        position: relative;
    }
</style>
