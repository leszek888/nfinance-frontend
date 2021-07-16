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
        setAuthToken: (state, token) => (state.authToken = token),
        setBalanceId: (state, balanceId) => (state.balanceId = balanceId),
        setFilters: (state, filters) => (state.filters = filters),
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
            console.log('createNewBalance');
            const response = await dispatch('sendApiRequest', {url: 'balance/new', method: 'GET'});
            console.log('balanceId = ', response['balance_id']);
            commit('setBalanceId', response['balance_id']);
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
