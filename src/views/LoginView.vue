<template>
    <div class="container">
        <div v-if="!$store.getters.isLoggedIn">
            <h1>Hello!</h1>
            <br>Use the link below to create a new demo balance sheet.<br /><br />
            <router-link to="/load?template=demo"><button class="cta-btn">Demo Balance Sheet</button></router-link><br /><br />
            or 
            <router-link to="/load" class="link">create empty Balance Sheet</router-link>
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

<style scoped>
    .container {
        line-height: 2;
        text-align: center;
    }
</style>
