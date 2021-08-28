<template>
    <div @keydown="handleKeyDown" class="input-with-label-container">
        <div v-if="errorMessage" class="error-message" @mouseenter="showErrorMessage(true)" @mouseleave="showErrorMessage(false)">
            <font-awesome-icon icon="question-circle" class="icons" />
        </div>
        <div v-if="showError" class="error-message-popup">
            {{ errorMessage }}
        </div>
        <label for="input" class="label">{{ label }}</label>
            <input
                :data-cy="dataCy"
                ref="input"
                v-model="input_value"
                @change="handleChange"
                @focus="handleFocus"
                autocomplete="off"
                name="input"
                :type="type ? type : 'text'"
            />
        <div
            :class="['autocomplete-container', !isFocused ? 'hidden' : 'shown']"
            data-cy="container-autocomplete"
            tabindex="-1"
            v-if="currentSuggestions.length > 0 && autoComplete"
        >
            <div v-for="(suggestion, index) in currentSuggestions" :key="index">
                <div
                    tabindex="-1"
                    :class="[index === currentSelection && 'selected', 'suggestion']"
                    data-cy="ac-suggestion"
                    @mouseover="currentSelection = index"
                >
                    {{ suggestion }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputWithAutocomplete',

    data() {
        return {
            currentSelection: 0,
            input_value: this.value,
            isFocused: false,
            errorMessage: '',
            showError: false,
        }
    },

    props: {
        autoComplete: Boolean,
        autoCompleteType: String,
        dataCy: String,
        label: String,
        suggestionsList: Array,
        type: String,
        value: String,
    },

    computed: {
        currentSuggestions: function() {
            let updatedSuggestions = [];
            if (this.suggestionsList) {
                if (this.autoCompleteType === 'splitted') {
                    const depth = this.input_value.split(':').length;

                    this.suggestionsList.forEach((suggestion) => {
                        if (suggestion.toLowerCase().startsWith(this.input_value.toLowerCase())) {
                            let splittedSuggestion = suggestion.split(':')[depth-1];
                            if (suggestion.split(':').length > depth)
                                splittedSuggestion += ':';

                            if (!updatedSuggestions.includes(splittedSuggestion) &&
                                this.input_value.split(':')[depth-1].replace(':', '') !== splittedSuggestion.replace(':', '')) {

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
        markAsInvalid(message) {
            this.$refs.input.classList.add('has-error');
            this.errorMessage = message;
        },

        formatValue(val) {
            if (this.type === 'number')
                return Number(val) ? Number(val) : '';
            return this.value;
        },

        isValid() {
            return this.input_value.trim().length > 0 ? true : false;
        },

        handleBlur() {
            this.isFocused = false;
            document.removeEventListener('click', this.checkClicks);
        },

        checkClicks(e) {
            if (this.$el.contains(e.target) && e.target.classList.contains('suggestion')) {
                this.isFocused = true;
                this.$refs.input.focus();

                let selectionIndex = Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode);
                this.selectSuggestion(selectionIndex);
            }
            else if (!this.$el.contains(e.target)) {
                this.isFocused = false;
            }
        },

        handleFocus() {
            this.isFocused = true;
            this.$refs.input.classList.remove('has-error');
            this.errorMessage = '';
            this.showError = false;

            document.addEventListener('click', this.checkClicks);
        },

        handleChange() {
            let value = this.input_value;
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
                case 9:
                    this.handleBlur();
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
            if (index < 0 || index >= this.currentSuggestions.length)
                return;

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

            this.currentSelection = 0;
            this.handleChange();
        },

        showErrorMessage(val) {
            this.showError = val;
        }
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
    .input-with-label-container {
        background-color: #fefefe;
        padding-top: 0.3rem;
        position: relative;
        color: #aaa;
    }
    .input-with-label-container input {
        border: solid 1px #ddd;
        box-sizing: border-box;
        font-size: 11pt;
        width: 100%;
    }
    .input-with-label-container input[type="date"] {
        background-color: none;
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
    .input-with-label-container .error-message {
        color: #a55a;
        position: absolute;
        top: 10pt;
        right: 10pt;
        z-index: 100;
    }
    .input-with-label-container .error-message-popup {
        border: solid 1px red;
        background-color: #fffafa;
        color: #400;
        font-size: 10pt;
        padding-top: 1em;
        padding-bottom: 1em;
        position: absolute;
        top: 30pt;
        width: 100%;
        z-index: 101;
    }
    .suggestion {
        padding: 0.5em;
        cursor: pointer;
        font-size: 11pt;
        text-align: left;
    }
    .pointer-cursor {
        cursor: pointer;
    }
    .selected {
        background-color: #00aa00;
        color: #fff;
    }
    .autocomplete-container {
        background-color: #fefefe;
        left: 0;
        max-height: 0pt;
        overflow: auto;
        position: absolute;
        right: 0;
        top: 100%;
        z-index: 900;
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
    .has-error {
        border-color: red !important;
    }

@media only screen and (max-width: 640px) {
    .suggestion {
        padding: 0.7em 0.5em;
    }
    .error-message {
        font-size: 18pt;
    }
}
</style>
