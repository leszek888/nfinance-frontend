<template>
    <div class="container" data-cy="container-accounts">
        <div class="reportscontainer">
            <router-link to="/reports/balance" class="report-link" active-class="active">Balance Sheet</router-link>
            <router-link to="/reports/net-worth" class="report-link" active-class="active">Net Worth</router-link>
            <router-link to="/reports/cash-flow" class="report-link" active-class="active">Cash Flow</router-link>
        </div>

        <FilterDate data-cy="filter-date" title="Period" name="date" @filter-update="updatePeriod" />

            <div v-if="accounts && accounts.length > 0">
                <div v-for="account, index in accounts" :key="index">
                    <account-row :account="account" :collapsed="false" />
                </div>
            </div>
    </div>
</template>

<script>
import AccountRow from '@/components/AccountRow.vue'
import FilterDate from '@/components/FilterDate.vue'

export default {
    name: 'Reports',

    components: {
        AccountRow,
        FilterDate,
    },

    data() {
        return {
            period: '',
            report_type: this.$route.params.report_type,
        }
    },

    watch: {
        $route(to) {
            this.report_type = to.params.report_type;
            this.updateFilters();
        },
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
        },

        handleClick(report_type) {
            this.report_type = report_type;
            this.updateFilters();
        },

        async updateFilters() {
            let filters = '';

            switch(this.report_type) {
                case 'balance':
                    break;
                case 'net-worth':
                    filters = 'account=Assets&account=Liabilities'
                    break;
                case 'cash-flow':
                    filters = 'account=Income&account=Expenses'
                    break;
                default:
                    break;
            }

            filters += this.period;
            this.$store.commit('setAccountsFilters', filters);
            await this.$store.dispatch('fetchData');
        },

        updatePeriod(period) {
            if (period[0].value && period[1].value) {
                this.period = '&' + period[0].name + '=' + period[0].value;
                this.period += '&' + period[1].name + '=' + period[1].value;
            }
            else
                this.period = '';
            this.updateFilters();
        },
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
    .reportscontainer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 0.5em;
        margin-bottom: 0.5em;
    }
    .reportscontainer button {
        background-color: #fafafa;
        border: none;
        font-size: 11pt;
        padding: 1em;
    }
    .reportscontainer button:hover {
        background-color: #f3f3f3;
    }
    .report-link {
        background-color: #fafafa;
        color: #0aa;
        text-align: center;
        text-decoration: none;
        padding: 1em;
    }
    .report-link:hover {
        background-color: #f0f0f0;
        color: #055;
    }
    .active {
        background-color: #f0f0f0;
        color: #055;
    }
</style>
