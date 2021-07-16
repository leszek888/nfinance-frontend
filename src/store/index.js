import { createStore } from 'vuex'

const store = createStore({
    state: {
        authToken: '',
        balanceId: '',
        name: 'Vue',
        transactions: [],
    },

    mutations: {
        setTransactions: (state, transactions) => (state.transactions = transactions),
        setAuthToken: (state, token) => (state.authToken = token),
        setBalanceId: (state, balanceId) => (state.balanceId = balanceId),
    },

    helpers: {
        async sendApiRequest(url, method, data) {
            console.log('ApiRequest: ', url, ', ', method, ', ', data);
            let headers = new Headers();
            headers.append('x-access-token', this.auth_token);
            headers.append('Content-Type', 'application/json');

            let body = null;
            if (method !== 'GET')
                body = JSON.stringify(data);

            const response = await fetch('http://127.0.0.1:5000/api/'+url,
                {method: method, mode: 'cors', headers: headers, body: body})

            const json = await response.json();

            if ('message' in json || 'error' in json) {
                console.log(json);
            }
            return json;
        },


    },

    actions: {
        async fetchTransactions({ commit }) {
            console.log('fetching transactions');
            const response = await this.helpers.sendApiRequest('transaction?'+this.filters, 'GET');
            commit('setTransactions', response['transactions']);
        },
        async getToken({ commit }) {
            console.log('getting token');
            let headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(this.state.balanceId + ':pw'))
            const response = await fetch('http://127.0.0.1:5000/api/auth', {method: 'GET', headers: headers, mode: 'cors'});
            const data = await response.json();
            console.log('setting token to: ', data['token']);
            commit('setAuthToken', data['token']);
        },
    },

    getters: {
        allTransactions: (state) => state.transactions,
        getAuthToken: (state) => state.authToken,
    },
});

export default store;
