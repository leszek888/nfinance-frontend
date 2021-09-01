<template>
    <div class="container" data-cy="container-accounts">
        <div class="reportscontainer">
            <router-link to="/reports/balance" class="report-link" active-class="report-link-active">Balance Sheet</router-link>
            <router-link to="/reports/net-worth" class="report-link" active-class="report-link-active">Net Worth</router-link>
            <router-link to="/reports/cash-flow" class="report-link" active-class="report-link-active">Cash Flow</router-link>
        </div>

        <FilterDate data-cy="filter-date" title="Period" name="date" @filter-update="updatePeriod" selected-period="All Time" />

        <div class="balance-sum"><span>Total</span><span>{{ balanceSum }}</span></div>

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
import Decimal from 'decimal.js'
import { numberToString } from './../helpers.js'

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
            this.$store.commit('setAccounts', []);
            this.report_type = to.params.report_type;
            this.updateFilters();
        },
    },

    computed: {
        accounts() { 
            let parsedAccounts = [];

            this.$store.getters.getAccounts.forEach(account => {
                let sub_accounts = account['name'].split(':');
                account['balance'] = Decimal(account['balance']);

                this.parseSubAccounts(sub_accounts, account['balance'], parsedAccounts, 0);
            });

            return parsedAccounts;
        },
        balanceSum() {
            let sum = Decimal(0);

            this.accounts.forEach(account => {
                sum = sum.plus(Decimal(account.balance));
            });

            return numberToString(sum.toString());
        }
    },

    methods: {
        parseSubAccounts(accounts, balance, array, depth) {
            let account = {};
            let account_found = false;

            account['name'] = accounts.shift();
            account['balance'] = balance;
            account['sub_accounts'] = [];

            if (account['balance'] == 0)
                return;

            array.forEach(element => {
                if (element['name'] == account['name']) {
                    account_found = true;
                    element['balance'] = element['balance'].plus(account['balance']);
                    this.parseSubAccounts(accounts, balance, element['sub_accounts'], depth+1);
                }
            });

            if (!account_found && accounts['balance'] != 0) {
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
            await this.$store.dispatch('loadAccounts');
        },

        updatePeriod(period) {
            this.period = '';
            if (period[0].value)
                this.period += '&' + period[0].name + '=' + period[0].value;
            if (period[1].value)
                this.period += '&' + period[1].name + '=' + period[1].value;
            this.updateFilters();
        },
    },


    mounted() {
        if (!this.$route.params.report_type);
            this.$router.push('/reports/balance');
    },
}
</script>

<style>
    .balance-sum {
        display: flex;
        font-weight: bold;
        font-size: 15pt;
        justify-content: space-between;
        padding: 0.3rem;
        text-align: right;
        width: 100%;
    }
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
        box-shadow: #aaa 0 0 6px;
        color: #055;
    }
    .report-link-active {
        background-color: #f0f0f0;
        box-shadow: #aaa 0 0 6px;
        color: #055;
    }
</style>
