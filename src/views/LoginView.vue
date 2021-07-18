<template>
    <div class="container">
        <div v-if="!$store.getters.isLoggedIn">
            <h1>Hello!</h1>
            <br>Use the link below to create a new demo balance sheet.<br /><br />
            <router-link to="/create" class="link">New Balance Sheet</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginView',

    created() {
        if (this.$store.getters.isLoggedIn)
            this.$router.push('/');
    },
}
</script>

<style>
    .container {
        text-align: center;
    }
</style>
