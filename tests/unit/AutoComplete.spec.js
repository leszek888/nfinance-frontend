import { mount } from '@vue/test-utils'
import AutoComplete from '@/components/AutoComplete.vue'

describe('AutoComplete.vue', () => {
    const suggestions = [
        'Assets',
        'Equity',
        'Liabilities',
    ];

    it('renders correctly', () => {
        const wrapper = mount(AutoComplete, {
            props: {
                suggestionsList: suggestions,
            },
        });

        suggestions.forEach(suggestion => {
            expect(wrapper.html()).toContain(suggestion);
        });
        expect(wrapper.find('[data-cy="container-autocomplete"]').exists()).toBeTruthy();
        expect(wrapper.findAll('[data-cy="ac-suggestion"]')).toHaveLength(3);
    });

    it('hides when there are no suggestions', () => {
        const wrapper = mount(AutoComplete);

        expect(wrapper.find('[data-cy="container-autocomplete"]').exists()).toBeFalsy();
    });

    it('marks first suggestion as selected when selection prop not specified', () => {
        const wrapper = mount(AutoComplete, {
            props: {
                suggestionsList: suggestions,
            },
        });

        expect(wrapper.find('.selected').exists()).toBeTruthy();
    });

    it('marks suggestion as selected when prop specified', () => {
        const wrapper = mount(AutoComplete, {
            props: {
                suggestionsList: suggestions,
                selection: 1,
            },
        });

        expect(wrapper.find('.selected').exists()).toBeTruthy();
    });
});
