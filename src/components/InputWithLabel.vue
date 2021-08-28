<template>
    <div @keydown="handleKeyDown" class="input-with-label-container">
        <label for="input" class="label">{{ label }}</label>
            <input
                :data-cy="dataCy"
                ref="input"
                v-model="input_value"
                @change="handleChange()"
                @focus="handleFocus"
                :type="type ? type : 'text'"
                name="input"
                autocomplete="off"
            />
    </div>
</template>

<script>
export default {
    name: 'InputWithLabel',

    data() {
        return {
            input_value: this.value,
        }
    },

    props: {
        dataCy: String,
        label: String,
        inputType: String,
        type: String,
        value: String,
    },

    methods: {
        markAsInvalid() {
            this.$refs.input.classList.add('has-error');
        },

        isValid() {
            return this.input_value.trim().length > 0 ? true : false;
        },

        handleFocus() {
            this.$refs.input.classList.remove('has-error');
        },

        handleChange() {
            let value = this.$refs.input.value;
            value = value.trim();

            this.$emit('change', value);
        },
        formatValue(val) {
            if (this.type === 'number')
                return Number(val) ? Number(val) : '';
            return val;
        }
    },

    created() {
        this.input_value = this.formatValue(this.value);
    },

    emits: ['change'],

}
</script>

<style scoped>
    *:focus {
        outline: none;
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
        appearance: none;
        background-color: #fefefe;
        border: solid 1px #ddd;
        box-sizing: border-box;
        font-size: 11pt;
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
    .pointer-cursor {
        cursor: pointer;
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
    .has-error {
        border-color: red !important;
    }
</style>
