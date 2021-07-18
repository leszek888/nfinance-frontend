<template>
    <div class="container">
        <h1>Creating new balance...</h1>
    </div>
</template>

<script>
export default {
    name: 'LoginView',

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
