<template>
    <div @keydown="handleKeyDown" class="input-with-label-container">
        <span class="label">{{ label }}</span>
        <input ref="input" :data-cy="dataCy" @change="handleChange" v-model="input_value" @blur="handleBlur" @focus="handleFocus" />
        <div v-if="autoComplete && currentSuggestions.length > 0" data-cy="container-autocomplete" :class="['autocomplete-container', !isFocused ? 'hidden' : 'shown']">
            <div v-for="(suggestion, index) in currentSuggestions" :key="index">
                <div
                    data-cy="ac-suggestion"
                    :class="[index === currentSelection && 'selected', 'suggestion']"
                    @click="selectSuggestion(index)"
                    @mouseover="currentSelection = index"
                >
                    {{ suggestion }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatNumber, numberToString, stringToNumber } from './../helpers.js'

export default {
    name: 'InputWithLabel',

    data() {
        return {
            currentSelection: 0,
            input_value: this.formatValue(),
            isFocused: false,
        }
    },

    props: {
        value: String,
        label: String,
        type: String,
        dataCy: String,
        required: Boolean,
        autoComplete: Boolean,
        autoCompleteType: String,
        suggestionsList: Array,
    },

    computed: {
        currentSuggestions: function() {
            let updatedSuggestions = [];
            if (this.suggestionsList) {
                if (this.autoCompleteType === 'splitted') {
                    const depth = this.input_value.split(':').length;

                    this.suggestionsList.forEach(suggestion => {
                        if (suggestion.toLowerCase().startsWith(this.input_value.toLowerCase())) {
                            let splittedSuggestion = suggestion.split(':')[depth-1];
                            if (suggestion.split(':').length > depth)
                                splittedSuggestion += ':';
                            if (!updatedSuggestions.includes(splittedSuggestion) &&
                                this.input_value.split(':')[depth-1] !== splittedSuggestion) {
                                updatedSuggestions.push(splittedSuggestion);
                            }
                        }
                    });
                }
                else {
                    updatedSuggestions = this.suggestionsList.filter(suggestion =>
                        suggestion.toLowerCase().startsWith(this.input_value.toLowerCase()) &&
                        suggestion.toLowerCase() !== this.input_value.toLowerCase()
                    );
                }
            }
            return updatedSuggestions;
        },
    },

    methods: {
        formatValue() {
            if (this.type === 'number')
                return numberToString(this.value);
            return this.value;
        },

        isValid() {
            return this.input_value.trim() > 0 ? true : false;
        },

        handleBlur() {
            this.isFocused = false;
            if (this.type === 'number' && formatNumber(this.input_value))
                this.input_value = formatNumber(this.input_value);

            if (this.isValid)
                this.$refs.input.classList.add('has-error');
            else
                this.$refs.input.classList.remove('has-error');
        },

        handleFocus() {
            this.isFocused = true;
        },

        handleChange() {
            let value = this.input_value;

            if (this.type === 'number')
                value = stringToNumber(value);

            value = value.trim();

            if (this.autoCompleteType === 'splitted')
                value = value.replace(/:$/, '');

            this.$emit('change', value);
        },

        handleKeyDown(event) {
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
                    return;
            }

            if (this.currentSelection < 0)
                this.currentSelection = this.currentSuggestions.length-1;
            else if (this.currentSelection > this.currentSuggestions.length - 1)
                this.currentSelection = 0;
        },

        selectSuggestion(index) {
            if (this.autoCompleteType === 'splitted' && this.currentSuggestions.length > 0) {
                let splittedParts = this.input_value.split(':');
                let updatedValue = "";
                splittedParts.pop();

                splittedParts.forEach(part => {
                    updatedValue += part + ":";
                });

                updatedValue += this.currentSuggestions[index];
                this.input_value = updatedValue;
            }
            else if (this.currentSuggestions.length > 0) {
                this.input_value = this.currentSuggestions[index];
            }

            this.handleChange();
            this.$refs.input.focus();
        },
    },

    created() {
        this.formatValue();
    },

    emits: ['change'],

}
</script>

<style scoped>
    @keyframes show-autocomplete {
        from { max-height: 0pt; }
        to { max-height: 100pt; }
    }
    @keyframes hide-autocomplete {
        from { max-height: 100pt; border: 1px; }
        to { max-height: 0pt; border: 0px; }
    }

    *:focus {
        outline: none;
    }
    .input-with-label-container {
        background-color: #fefefe;
        padding: 4pt;
        position: relative;
        color: #aaa;
    }
    .input-with-label-container input {
        border: solid 1px #ddd;
        box-sizing: border-box;
        font-size: 11pt;
        padding: 4pt;
        width: 100%;
    }
    .input-with-label-container input:focus {
        border-color: #666;
    }
    .input-with-label-container .label {
        background-color: #fefefe;
        top: 0pt;
        color: #aaa;
        font-size: 8pt;
        left: 8pt;
        position: absolute;
    }
    .suggestion {
        padding: 4pt;
        cursor: pointer;
        font-size: 11pt;
    }
    .selected {
        background-color: #00aa00;
        color: #fff;
    }
    .autocomplete-container {
        background-color: #fefefe;
        left: 4pt;
        max-height: 0pt;
        overflow: auto;
        position: absolute;
        right: 4pt;
        top: 24pt;
        z-index: 1000;
    }
    .shown {
        animation-duration: 0.2s;
        animation-name: show-autocomplete;
        max-height: 100pt;
        box-shadow: 2px 2px 4px #bbb;
        border: solid;
        border-width: 0px 1px 1px 1px;
        border-color: #aaa;
    }
    .hidden {
        border: 0pt;
        max-height: 0pt;
        opacity: 0;
    }
</style>
