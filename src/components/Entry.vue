<template>
    <div class="entry-container">
        <div class="account">{{ account }}</div>
        <div class="amount">{{ amount }}</div>
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
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    .entry-container .account {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
