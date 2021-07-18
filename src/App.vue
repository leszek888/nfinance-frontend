<template>
    <div v-if="loggedIn">
        <NavBar class="navbar-main" />
    </div>
    <div class="main-content">
        <router-view v-slot="{ Component }">
            <transition name="slide" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'App',

    components: {
        NavBar,
    },

    computed: {
        loggedIn() { return this.$store.getters.getAuthToken && this.$store.getters.getAuthToken.length > 0 },
    },

    mounted() {
        const balance_id = localStorage.getItem('balance_id');
        const auth_token = localStorage.getItem('auth_token');

        if (balance_id && auth_token) {
            this.$store.commit('setBalanceId', balance_id);
            this.$store.commit('setAuthToken', auth_token);
        }
    },
}
</script>

<style>

body {
    padding-top: 3.5em;
}

#app {
    font-family: sans-serif;
    position: relative;
    color: #555;
}

.main-content {
    max-width: 1100px;
    min-width: 320px;
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
</style>
