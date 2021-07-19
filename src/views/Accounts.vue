<template>
    <div class="container" data-cy="container-accounts">
        <div v-for="account, index in accounts" :key="index">
            <account-row :account="account" />
        </div>
    </div>
</template>

<script>
import AccountRow from '@/components/AccountRow.vue'

export default {
    name: 'Accounts',

    components: {
        AccountRow,
    },

    computed: {
        accounts() { return this.$store.getters.getAccounts },
    },

    mounted() {
        this.$store.dispatch('loadAccounts');
    },
}
</script>

<style>
    .container {
        position: relative;
    }
</style>
