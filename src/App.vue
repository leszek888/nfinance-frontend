<template>
        <transition name="slide">
            <div v-if="$store.getters.isLoggedIn">
                <NavBar />
            </div>
        </transition>
        <div class="main-content">
            <div v-if="$store.getters.isInitialized">
                <router-view v-slot="{ Component }">
                    <transition name="slide" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </div>
        </div>
        <AppFooter />
</template>

<script>
import AppFooter from '@/components/AppFooter.vue'
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'App',

    components: {
        AppFooter,
        NavBar,
    },

    mounted() {
        const balance_id = localStorage.getItem('balance_id');
        const auth_token = localStorage.getItem('auth_token');

        if (balance_id && auth_token) {
            this.$store.commit('setBalanceId', balance_id);
            this.$store.commit('setAuthToken', auth_token);
        }

        if (this.$store.getters.isLoggedIn) {
            this.$nextTick(() => {
                this.$store.dispatch('fetchTransactions');
                this.$store.dispatch('loadAccounts');
            });
        }
        else {
            this.$store.commit('setInitialized', true);
        }
    },
}
</script>

<style>

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

*:focus {
    outline: thin #111 solid;
}
a:focus {
    outline: thin #aaa dotted;
}
.cta-btn {
    background-color: #3ca4d1;
    border: none;
    border-radius: 15px;
    color: #fff;
    font-size: 12pt;
    padding: 1em;
}
.cta-btn:hover {
    filter: brightness(1.1);
    cursor: pointer;
}

body {
    padding-top: 5em;
}

footer {
    background-color: #eee;
    border-top: solid 2px #ccc;
    color: #aaa;
    margin-top: 10em;
    min-height: 30vh;
    padding: 4em;
    text-align: center;
    width: 100%;
}

#app {
    font-family: sans-serif;
    position: relative;
    color: #555;
}

.main-content {
    max-width: 1100px;
    min-width: 320px;
    min-height: 50vh;
    margin: auto;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease-out;
}

.slide-enter-to {
  position: absolute;
  top: 0;
  opacity: 1;
}

.slide-enter-from {
  position: absolute;
  top: -50pt;
  opacity: 0;
}

.slide-leave-to {
  position: absolute;
  opacity: 0;
}

.slide-leave-from {
  position: absolute;
  opacity: 1;
}

a {
    color: #48a;
    text-decoration: none;
}

a:hover {
    color: #157;
}

input {
    padding: 0.5em 0.5em;
    border: solid 1px #aaa;
    font-size: 11pt;
}

select {
    background: #fff;
    border: solid 1px #aaa;
    font-size: 11pt;
    padding: 0.5em 0.5em;
}

input[type="date"] {
    appearance: none;
    background: #fff;
    border: solid 1px #aaa;
    font-size: 11pt;
}

@media only screen and (max-width: 640px) {
    input, select {
        padding: 0.75em 0.5em;
    }
}
</style>
