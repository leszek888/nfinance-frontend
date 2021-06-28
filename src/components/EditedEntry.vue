<template>
    <div class="container">
        <input @focusout="updateEntry" type="text" v-model="entry.account" />
        <input @focusout="updateEntry" type="text" v-model="entry.amount" />
    </div>
</template>

<script>
export default {
    name: 'EditedEntry',

    props: {
        account: String,
        amount: String,
        id: String,
    },

    data() {
        return {
            entry: {
                account: this.account,
                amount: this.amount,
                id: this.id,
            }
        }
    },

    methods: {
        updateEntry() {
            this.$emit('update-entry', this.entry);
        }
    },

    emits: [ 'update-entry' ]

}
</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 1fr 125px;
}
</style>
