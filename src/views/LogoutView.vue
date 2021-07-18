<template>
    <div>
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
    div {
        text-align: center;
    }
    .link {
        color: #48a;
        text-decoration: none;
    }
    .link:hover {
        color: #157;
    }
</style>
