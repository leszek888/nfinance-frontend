<template>
    <nav>
        <ul>
            <li><router-link data-cy="nav-link-accounts" to="/accounts">Accounts</router-link></li>
            <li><router-link data-cy="nav-link-transactions" to="/transactions">Transactions</router-link></li>
        </ul>
        <ul>
            <li><router-link to="/logout">Log out</router-link></li>
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

    .navbar-main {
        background-color: #555;
        box-shadow: 0px 0px 5px #444;
        display: flex;
        justify-content: space-between;
        left: 0;
        padding: 1em;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 99;
    }

    .navbar-main a {
        color: #eee;
        text-decoration: none;
        transition: all 0.2s;
    }

    .navbar-main a:hover {
        color: #0ff;
    }

</style>
