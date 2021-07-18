<template>
    <div class="container">
        <h1>
            You have been logged out.
        </h1>
        <router-link to="/login" class="link">Create New Balance</router-link>
    </div>
</template>

<script>
export default {
    name: 'LogoutView',

    mounted() {
        console.log('LogoutView...');
        this.$store.commit('setBalanceId', '');
        this.$store.commit('setAuthToken', '');
    },
}
</script>

<style scoped>
    .container {
        text-align: center;
    }
</style>
