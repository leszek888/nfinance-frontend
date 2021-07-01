<template>
    <div @keydown="handleKeyDown" class="input-with-label-container">
        <span class="label">{{ label }}</span>
        <input @keydown="handleKeyDown" :data-cy="dataCy" type="text" :value="formattedValue" @change="handleChange" />
        <AutoComplete :suggestions-list="suggestionsList" :selection="currentSelection" />
    </div>
</template>

<script>
import { formatNumber, stringToNumber } from './../helpers.js'
import AutoComplete from './AutoComplete.vue'

export default {
    name: 'InputWithLabel',

    components: {
        AutoComplete,
    },

    data() {
        return {
            currentSelection: 0,
            input_value: this.value,
        }
    },

    props: {
        value: String,
        label: String,
        type: String,
        dataCy: String,
        autocomplete: Boolean,
        suggestionsList: Array,
    },

    computed: {
        formattedValue: function() {
            let value = null;

            if (this.type === 'number')
                value = formatNumber(this.input_value);
            else
                value = this.input_value;

            return value;
        },
    },

    methods: {
        handleChange(event) {
            let value = event.target.value;

            if (this.type === 'number')
                value = stringToNumber(value);
            this.$emit('change', value);
        },

        handleKeyDown(event) {
            console.log('handling keyCode: ', event.keyCode);
            console.log('selection before: ', this.currentSelection);
            switch (event.keyCode) {
                case 40:
                    this.currentSelection++;
                    break;
                case 38:
                    this.currentSelection--;
                    break;
                default:
                    console.log('no case matched');
                    break;
            };

            if (this.currentSelection < 0)
                this.currentSelection = this.suggestionsList.length-1;
            else if (this.currentSelection > this.suggestionsList.length - 1)
                this.currentSelection = 0;

            console.log('current selection: ' + this.currentSelection);
        },

        onEnter() {
            if (this.autocomplete && this.suggestionsList && this.suggestionsList.length > 0) {
                this.input_value = this.suggestionsList[this.currentSelection];
            }
        },
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
