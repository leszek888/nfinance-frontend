<template>
    <div class="container">
        <div v-if="!$store.getters.isLoggedIn">
            <div v-if="getBalanceIdFromUrl">
                <h1>Loading balance...</h1>
            </div>
            <div v-if="!getBalanceIdFromUrl">
                <h1>Creating new balance...</h1>
                {{ currentStatus }}
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

    data() {
        return {
            currentStatus: '',
        }
    },

    methods: {
        async createBalance() {
            const params = new URLSearchParams(window.location.search.substring(1));
            const balance_id = params.get('balance_id');
            const template = params.get('template')

            if (balance_id) {
                this.$store.commit('setBalanceId', balance_id);
            }
            else {
                if (template && template === 'demo')
                    await this.$store.dispatch('createDemoBalance')
                else
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
