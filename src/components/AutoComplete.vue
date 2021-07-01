<template>
    <div v-if="suggestionsNotEmpty" data-cy="container-autocomplete">
        <div v-for="(suggestion, index) in currentSuggestions" :key="index">
            <div data-cy="ac-suggestion" :class="[checkIfSelected(index)]">
                {{ suggestion }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AutoComplete',

    props: {
        text: String,
        suggestionsList: Array,
        onSelectNext: Boolean,
        selection: Number,
    },

    computed: {
        currentSuggestions: function() {
            if (this.suggestionsList) {
                if (this.text && this.text.length > 0)
                    return this.suggestionsList.filter(suggestion => suggestion.startsWith(this.text));
                else
                    return this.suggestionsList;
            }
            return null;
        },
        suggestionsNotEmpty: function() {
            return (this.currentSuggestions && this.currentSuggestions.length > 0);
        },
    },

    methods: {
        checkIfSelected(index) {
            if (!this.selection && index === 0) {
                return 'selected';
            }
            else if (this.selection === index) {
                return 'selected';
            }
            return '';
        },

    },
}
</script>
