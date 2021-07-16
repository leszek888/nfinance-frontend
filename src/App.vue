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
    async mounted() {
        const params = new URLSearchParams(window.location.search.substring(1));
        this.balance_id = params.get('balance_id');

        if (this.balance_id) {
            this.$store.commit('setBalanceId', this.balance_id);
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

</style>
