<template>
    <div v-if="suggestionsNotEmpty" data-cy="container-autocomplete">
        <div v-for="(suggestion, index) in currentSuggestions" :key="index">
            <div data-cy="ac-suggestion">
                {{ suggestion }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AutoComplete',

    data() {
        return {
            currentSelection: 0,
        }
    },

    props: {
        text: String,
        suggestionsList: Array,
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

    created() {
        if (this.currentSuggestions)
            this.$emit('ac-selection', this.currentSuggestions[this.currentSelection]);
    },
}
</script>
