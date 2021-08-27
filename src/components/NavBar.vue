<template>
    <nav class="navbar-main">
        <div class="container-nav">
            <ul>
                <li><router-link
                        data-cy="nav-link-accounts"
                        to="/reports"
                        class="nav-link"
                        active-class="nav-link-active"
                    >
                    Accounts
                </router-link></li>
                <li><router-link
                        data-cy="nav-link-transactions"
                        to="/transactions"
                        class="nav-link"
                        active-class="nav-link-active"
                    >
                    Transactions
                </router-link></li>
            </ul>
            <ul>
                <li><router-link
                        to="/logout"
                        class="nav-link"
                    >
                    Log out
                </router-link></li>
            </ul>
        </div>
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
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 99;
    }

    .nav-link {
        color: #eee;
        text-decoration: none;
        transition: all 0.2s;
    }

    .nav-link:hover {
        color: #0ff;
    }

    .nav-link-active {
        color: #0ff;
    }

    .container-nav {
        display: flex;
        height: 100%;
        justify-content: space-between;
        margin: auto;
        max-width: 1100px;
        padding: 1em;
    }

</style>
