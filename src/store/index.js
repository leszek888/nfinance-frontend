import { createStore } from 'vuex'

const store = createStore({
    state: {
        authToken: '',
        balanceId: '',
        filters: '',
        name: 'Vue',
        transactions: [],
    },

    mutations: {
        setTransactions: (state, transactions) => (state.transactions = transactions),
        setFilters: (state, filters) => (state.filters = filters),

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

            const response = await fetch('http://127.0.0.1:5000/api/'+url,
                {method: method, mode: 'cors', headers: headers, body: body})

            const json = await response.json();

            if ('message' in json || 'error' in json) {
                console.log(json);
            }
            return json;
        },
        async fetchTransactions({ commit, dispatch, getters }) {
            const response = await dispatch('sendApiRequest', {url: 'transaction?'+getters.getFilters, method: 'GET'});
            commit('setTransactions', response['transactions']);
        },
        async getToken({ commit }) {
            let headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(this.state.balanceId + ':pw'))
            const response = await fetch('http://127.0.0.1:5000/api/auth', {method: 'GET', headers: headers, mode: 'cors'});
            const data = await response.json();
            commit('setAuthToken', data['token']);
        },
        async createNewBalance({ commit, dispatch }) {
            const response = await dispatch('sendApiRequest', {url: 'balance/new', method: 'GET'});
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
        getBalanceId: (state) => state.balanceId,
        getFilters: (state) => state.filters,
    },
});

export default store;
