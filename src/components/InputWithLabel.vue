<template>
    <div @keydown="handleKeyDown" class="input-with-label-container">
        <span class="label">{{ label }}</span>
        <input :data-cy="dataCy" type="text" :value="formattedValue" @change="handleChange" />
        <div v-if="autoComplete" data-cy="container-autocomplete">
            <div v-for="(suggestion, index) in currentSuggestions" :key="index">
                <div
                    data-cy="ac-suggestion"
                    :class="index === currentSelection && 'selected'"
                    @click="selectSuggestion(index)"
                >
                    {{ suggestion }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatNumber, stringToNumber } from './../helpers.js'

export default {
    name: 'InputWithLabel',

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
        autoComplete: Boolean,
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

        currentSuggestions: function() {
            if (this.suggestionsList)
                return this.suggestionsList.filter(suggestion => suggestion.startsWith(this.input_value));
            return [];
        },
    },

    methods: {
        handleChange(event) {
            let value = event.target.value;

            if (this.type === 'number')
                value = stringToNumber(value);

            this.input_value = value;
            this.$emit('change', value);
        },

        handleKeyDown(event) {
            if (!this.autoComplete)
                return;

            switch (event.keyCode) {
                case 40:
                    this.currentSelection++;
                    break;
                case 38:
                    this.currentSelection--;
                    break;
                case 13:
                    this.selectSuggestion(this.currentSelection);
                    return;
                default:
                    console.log('no case matched');
                    return;
            }

            if (this.currentSelection < 0)
                this.currentSelection = this.currentSuggestions.length-1;
            else if (this.currentSelection > this.currentSuggestions.length - 1)
                this.currentSelection = 0;
        },

        selectSuggestion(index) {
            this.input_value = this.currentSuggestions[index];
        },
    },

    created() {
        if (this.suggestionsList)
            console.log('suggestionsList: ', this.suggestionsList);
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
    .selected {
        color: red;
    }
</style>
