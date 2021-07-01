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

    it('shows only passing suggestions', () => {
        const wrapper = mount(AutoComplete, {
            props: {
                suggestionsList: suggestions,
                text: 'A',
            },
        });
        expect(wrapper.findAll('[data-cy="ac-suggestion"]')).toHaveLength(1);
        expect(wrapper.html()).toContain('Assets');
    });

    it('emits first suggestion as selected', async () => {
        const wrapper = mount(AutoComplete, {
            props: {
                suggestionsList: suggestions,
            },
        });

        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('ac-selection')).toBeTruthy();
        expect(wrapper.emitted('ac-selection')[0][0]).toEqual('Assets');
    });
});
