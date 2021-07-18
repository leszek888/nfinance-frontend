<template>
    <nav>
        <ul>
            <li><router-link to="/accounts">Accounts</router-link></li>
            <li><router-link to="/transactions">Transactions</router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
}
</script>

<style scoped>
    ul {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        padding-right: 15pt;
    }
</style>
