<template>
    <h3>Calculator</h3>
    <form v-on:submit.prevent="add">
        <input type="number" v-model="state.num1" />
        <input type="number" v-model="state.num2" />
        <button type="submit">
            Add
        </button>
    </form>
    <p>Result: {{ sum > 10 ? 'parzysta' : 'nieparzysta' }}</p>
</template>

<script>
    import { reactive, computed } from 'vue'

    export default {
        setup() {
            const state = reactive({
                num1: 0,
                num2: 0,
            });

            const sum = computed(() => parseInt(state.num1, 10) + parseInt(state.num2, 10));

            return {
                state,
                sum,
            }
        }
    }
</script>
<style></style>
