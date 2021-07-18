<template>
    <div class="container">
        <h1>Hello!</h1>
        <br>Use the link below to create a new demo balance sheet.<br /><br />
        <router-link to="/create" class="link">New Balance Sheet</router-link>
    </div>
</template>

<script>
export default {
    name: 'LoginView',

}
</script>

<style>
    .container {
        text-align: center;
    }
</style>
