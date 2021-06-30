<template>
    <div class="input-with-label-container">
        <span class="label">{{ label }}</span>
        <input :data-cy="dataCy" type="text" :value="formattedValue" @change="handleChange" />
    </div>
</template>

<script>
import { formatNumber, stringToNumber } from './../helpers.js'
export default {
    name: 'InputWithLabel',

    props: {
        value: String,
        label: String,
        type: String,
        dataCy: String,
    },

    computed: {
        formattedValue: function() {
            let value = null;

            if (this.type === 'number')
                value = formatNumber(this.value);
            else
                value = this.value;

            return value;
        },
    },

    methods: {
        handleChange(event) {
            let value = event.target.value;

            if (this.type === 'number')
                value = stringToNumber(value);
            this.$emit('change', value);
        }
    },

    emits: ['change'],

}
</script>

<style scoped>
    .input-with-label-container {
        background-color: #fefefe;
        padding: 4pt;
        position: relative;
        color: #aaa;
    }
    .input-with-label-container input {
        border: 0px;
        border-bottom: solid 1px #aaa;
        border-left: solid 1px #aaa;
        box-sizing: border-box;
        padding: 4pt;
        padding-bottom: 6pt;
        padding-top: 1pt;
        width: 100%;
    }
    .input-with-label-container .label {
        background-color: #fefefe;
        bottom: 0pt;
        color: #aaa;
        font-size: 8pt;
        left: 8pt;
        position: absolute;
    }
</style>
