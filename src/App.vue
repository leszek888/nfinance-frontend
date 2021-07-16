<template>
    <NavBar />
    <div v-if="auth_token">
        <router-view>
        </router-view>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'App',

    components: {
        NavBar,
    },
    computed: {
        auth_token() { return this.$store.getters.getAuthToken; },
    },
    methods: {
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

    async created() {
        this.balance_id = this.$route.query.balance_id;
        if (this.balance_id) {
            this.$store.commit('setBalanceId', this.balance_id);
        }
        else {
            await this.$store.dispatch('createNewBalance');
        }
        await this.$store.dispatch('getToken');
        this.$router.push({ path: '/', query: { balance_id: this.$store.getters.getBalanceId }});
    },
}
</script>

<style>
#app {
    font-family: sans-serif;
    position: relative;
    color: #555;
}

.btn-new-transaction {
    background-color: #4a9e56;
    border: 0px;
    border-radius: 25pt;
    box-shadow: 0px 0px 8px #aaa;
    bottom: 2em;
    color: #fefefe;
    font-size: 12pt;
    padding: 1.5em;
    position: fixed;
    right: 2em;
    z-index: 99;
}

.btn-new-transaction:hover {
    filter: brightness(0.9);
}

select {
    border: solid 1px #aaa;
    font-size: 11pt;
    padding: 4pt;
}

select::after {
    content: "A";
}
</style>
