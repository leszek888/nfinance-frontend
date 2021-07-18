<template>
    <NavBar class="navbar-main" />
    <div v-if="auth_token">
        <div class="main-content">
            <router-view>
            </router-view>
        </div>
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

    async mounted() {
        const params = new URLSearchParams(window.location.search.substring(1));
        this.balance_id = params.get('balance_id');

        if (this.balance_id) {
            this.$store.commit('setBalanceId', this.balance_id);
        }
        else if (localStorage.getItem('balance_id') && localStorage.getItem('auth_token')) {
            this.$store.commit('setBalanceId', localStorage.getItem('balance_id'));
            this.$store.commit('setAuthToken', localStorage.getItem('auth_token'));
            return;
        }
        else {
            await this.$store.dispatch('createNewBalance');
        }
        await this.$store.dispatch('getToken');
        await this.$store.dispatch('fetchTransactions');
        this.$router.push({ path: '/', query: { balance_id: this.$store.getters.getBalanceId }});
    },
}
</script>

<style>

body {
    padding-top: 3.5em;
}

#app {
    font-family: sans-serif;
    position: relative;
    color: #555;
}

.navbar-main {
    background-color: #555;
    box-shadow: 0px 0px 5px #444;
    left: 0;
    padding: 1em;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 99;
}

.navbar-main a {
    color: #eee;
    text-decoration: none;
    transition: all 0.2s;
}

.navbar-main a:hover {
    color: #0ff;
}

.main-content {
    max-width: 1100px;
    min-width: 320px;
    margin: auto;
}

</style>
