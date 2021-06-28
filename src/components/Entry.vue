<template>
    <div class="entry-container">
        <span class="account">{{ account }}</span>
        <span class="amount">{{ amount }}</span>
    </div>
</template>

<script>
export default {
    name: 'Entry',
    props: {
        account: String,
        amount: String,
    }
}
</script>

<style scoped>
    .entry-container {
        justify-content: space-between;
        display: flex;
    }
</style>
