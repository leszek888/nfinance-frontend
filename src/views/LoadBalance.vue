<template>
    <div class="container">
        <div v-if="!$store.getters.isLoggedIn">
            <div v-if="getBalanceIdFromUrl">
                <h1>Loading balance...</h1>
            </div>
            <div v-if="!getBalanceIdFromUrl">
                <h1>Creating new balance...</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadBalance',

    computed: {
        getBalanceIdFromUrl() {
            const params = new URLSearchParams(window.location.search.substring(1));
            return params.get('balance_id');
        },
    },

    methods: {
        async createBalance() {
            const params = new URLSearchParams(window.location.search.substring(1));
            const balance_id = params.get('balance_id');

            if (balance_id) {
                console.log('balance_id :D', balance_id);
                this.$store.commit('setBalanceId', balance_id);
            }
            else {
                console.log('no balance_id :(', balance_id);
                await this.$store.dispatch('createNewBalance');
            }
            await this.$store.dispatch('getToken');
            await this.$store.dispatch('fetchTransactions');
            this.$router.push('/');
        },
    },

    created() {
        if (this.$store.getters.isLoggedIn && !this.getBalanceIdFromUrl)
            this.$router.push('/');
    },

    async mounted() {
        setTimeout(() => this.createBalance(), 1000);
    },
}
</script>

<style>
    .container {
        text-align: center;
    }
</style>
