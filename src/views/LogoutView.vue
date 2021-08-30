<template>
    <div class="container">
        <h1>
            You have been logged out.
        </h1>
        <br />
        <router-link to="/login" class="link">Home Page</router-link>
    </div>
</template>

<script>
export default {
    name: 'LogoutView',

    mounted() {
        console.log('LogoutView...');
        this.$store.commit('setBalanceId', '');
        this.$store.commit('setAuthToken', '');
        this.$store.commit('setTransactions', []);
        this.$store.commit('setAccounts', []);
        this.$store.commit('setFilters', '');
    },
}
</script>

<style scoped>
    .container {
        text-align: center;
    }
</style>
