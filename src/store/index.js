import { createStore } from 'vuex'

const store = createStore({
    state: {
        authToken: '',
        accounts: [],
        balanceId: '',
        filters: '',
        accountsFilters: '',
        initialized: false,
        name: 'Vue',
        transactions: [],
    },

    mutations: {
        setTransactions: (state, transactions) => (state.transactions = transactions),
        setAccounts: (state, accounts) => (state.accounts = [...accounts]),
        setFilters: (state, filters) => (state.filters = filters),
        setAccountsFilters: (state, filters) => (state.accountsFilters = filters),

        setAuthToken: (state, token) => {
            state.authToken = token;
            if (token.length === 0)
                localStorage.removeItem('auth_token');
            else
                localStorage.setItem('auth_token', token);
        },

        setBalanceId: (state, balanceId) => {
            state.balanceId = balanceId;
            if (balanceId.length === 0)
                localStorage.removeItem('balance_id', balanceId);
            else
                localStorage.setItem('balance_id', balanceId);
        },

        setInitialized: (state, isInitialized) => state.initialized = isInitialized,
    },

    actions: {
        async sendApiRequest({getters}, {url, method, data = null}) {
            let headers = new Headers();
            headers.append('x-access-token', getters.getAuthToken);
            headers.append('Content-Type', 'application/json');

            let body = null;
            if (method !== 'GET') {
                body = JSON.stringify(data);
            }

            const response = await fetch(process.env.VUE_APP_ROOT_API+'/api/'+url,
                {method: method, mode: 'cors', headers: headers, body: body})

            const json = await response.json();

            if ('message' in json || 'error' in json) {
                console.log(json);
            }
            return json;
        },
        async fetchData({ dispatch }) {
            await dispatch('fetchTransactions');
            await dispatch('loadAllAccounts');
        },
        async fetchTransactions({ commit, dispatch, getters }) {
            const response = await dispatch('sendApiRequest', {url: 'transaction?'+getters.getFilters, method: 'GET'});

            if (!getters.isInitialized)
                commit('setInitialized', true);

            if ('transactions' in response)
                commit('setTransactions', response['transactions']);
        },
        async loadAllAccounts({ commit, dispatch }) {
            const response = await dispatch('sendApiRequest', {url: 'accounts', method: 'GET'});
            if ('accounts' in response) {
                commit('setAccounts', response['accounts']);
            }
 
        },
        async loadAccounts({ commit, dispatch, getters }) {
            const response = await dispatch('sendApiRequest', {url: 'accounts?'+getters.getAccountsFilters, method: 'GET'});
            if ('accounts' in response) {
                commit('setAccounts', response['accounts']);
            }
        },
        async getToken({ commit }) {
            let headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(this.state.balanceId + ':pw'))
            const response = await fetch(process.env.VUE_APP_ROOT_API+'/api/auth', {method: 'GET', headers: headers, mode: 'cors'});
            let data = await response.json();
            if ('token' in data)
                commit('setAuthToken', data['token']);
        },
        async createNewBalance({ commit, dispatch }) {
            const response = await dispatch('sendApiRequest', {url: 'balance/new', method: 'GET'});
            if ('balance_id' in response)
                commit('setBalanceId', response['balance_id']);
        },
        async createBalanceFromTemplate({ commit, dispatch }, template) {
            const response = await dispatch('sendApiRequest', {url: 'balance/new?template='+template, method: 'GET'});
            if ('balance_id' in response)
                commit('setBalanceId', response['balance_id']);
        },
        async saveTransaction({ dispatch }, transaction) {
            await dispatch('sendApiRequest', {url: 'transaction', method: 'POST', data: transaction});
        },
        async deleteTransaction({ dispatch }, transaction) {
            await dispatch('sendApiRequest', {url: 'transaction', method: 'DELETE', data: transaction});
        },
    },

    getters: {
        allTransactions: (state) => state.transactions,
        getAuthToken: (state) => state.authToken,
        getAccounts: (state) => state.accounts,
        getAccountsFilters: (state) => state.accountsFilters,
        getBalanceId: (state) => state.balanceId,
        getFilters: (state) => state.filters,
        isInitialized: (state) => state.initialized,
        isLoggedIn: (state) => { return state.authToken && state.balanceId }
    },
});

export default store;
