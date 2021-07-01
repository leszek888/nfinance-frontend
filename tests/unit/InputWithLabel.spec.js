import { mount } from '@vue/test-utils'
import InputWithLabel from '@/components/InputWithLabel.vue'

describe('InputWithLabel.vue', () => {
    it('renders without AutoComplete by default', () => {
        const wrapper = mount(InputWithLabel, {
            props: {
                value: '12345.44',
                type: 'number',
            } ,
        });

        expect(wrapper.find('[data-cy="container-autocomplete"]').exists()).toBeFalsy();
    });

    it('renders with AutoComplete when autocomplete prop is true and suggestions are present', () => {
        const wrapper = mount(InputWithLabel, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        expect(wrapper.find('[data-cy="container-autocomplete"]').exists()).toBeTruthy();
    });

    it('should update suggestions when input has changed', async () => {
         const wrapper = mount(InputWithLabel, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });       

        wrapper.vm.input_value = 'E';
        await wrapper.vm.$nextTick();
        expect(wrapper.findAll('[data-cy="ac-suggestion"]')).toHaveLength(1);
        expect(wrapper.findAll('[data-cy="ac-suggestion"]')[0].text()).toEqual('Equity');
    });

    it('marks first suggestion as selected when suggestions are given', () => {
        const wrapper = mount(InputWithLabel, {
            props: {
                value: '',
                type: 'number',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        expect(wrapper.vm.currentSelection).toEqual(0);
        expect(wrapper.find('.selected').exists()).toBeTruthy();
        expect(wrapper.findAll('.selected')).toHaveLength(1);
    });

    it('should format number, when input type is number', async () => {
        const wrapper = mount(InputWithLabel, {
            props: {
                value: '12345.44',
                type: 'number',
            } ,
        });
        expect(wrapper.find('input').element.value).toEqual('12.345,44');
    });

    it('should update current selection when up and down arrows are pressed', () => {
        const wrapper = mount(InputWithLabel, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        wrapper.find('input').trigger('keydown.down');
        wrapper.find('input').trigger('keydown.down');
        wrapper.find('input').trigger('keydown.down');
        wrapper.find('input').trigger('keydown.up');
        expect(wrapper.vm.currentSelection).toEqual(2);
    });

    it('should set input value to currently selected suggestion from autocomplete when hitting enter', async () => {
         const wrapper = mount(InputWithLabel, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        wrapper.vm.currentSelection = 1;
        wrapper.trigger('keydown.enter');
        await wrapper.vm.$nextTick();
        expect(wrapper.find('input').element.value).toEqual('Equity');
    });

    it('should set input value to clicked suggestion', async () => {
         const wrapper = mount(InputWithLabel, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        wrapper.findAll('[data-cy="ac-suggestion"]')[2].trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.find('input').element.value).toEqual('Liabilities');
    });

});


