<template>
    <div v-for="account, index in accounts" :key="index">
        <account-row :account="account" />
    </div>
</template>

<script>
import AccountRow from '@/components/AccountRow.vue'

export default {
    name: 'Accounts',

    components: {
        AccountRow,
    },

    data() {
        return {
            accounts:
            [
                {
                    name: 'Assets', balance: '1500', sub_accounts:
                    [
                        { name: 'Current', balance: '300', sub_accounts:
                        [
                            { name: 'Cash', balance: '100', sub_accounts: [] },
                            { name: 'Bank', balance: '200', sub_accounts: [] },
                        ]},
                        { name: 'Fixed', balance: '700', sub_accounts: [] },
                    ]
                },
                {
                    name: 'Liabilities', balance: '-1000', sub_accounts:
                    [
                        { name: 'Loan', balance: '-1000', sub_accounts: [] },
                    ]
                },
                {
                    name: 'Equity', balance: '-500', sub_accounts:
                    [
                        { name: 'Start Capital', balance: '-500', sub_accounts: [] },
                    ]
                },

            ],
        }
    },
}
</script>
