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

    it('renders with AutoComplete when autocomplete prop is true, suggestions are present and is focused', async () => {
        const wrapper = mount(InputWithLabel, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        await wrapper.find('input').trigger('focus');
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

        await wrapper.find('input').trigger('focus');
        await wrapper.find('input').setValue('e');
        expect(wrapper.findAll('[data-cy="ac-suggestion"]')).toHaveLength(1);
        expect(wrapper.findAll('[data-cy="ac-suggestion"]')[0].text()).toEqual('Equity');
    });

    it('marks first suggestion as selected when suggestions are given', async () => {
        const wrapper = mount(InputWithLabel, {
            props: {
                value: '',
                type: 'number',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        await wrapper.find('input').trigger('focus');
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

    it('should update current selection when up and down arrows are pressed', async () => {
        const wrapper = mount(InputWithLabel, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        await wrapper.find('input').trigger('keydown.down');
        await wrapper.find('input').trigger('keydown.down');
        await wrapper.find('input').trigger('keydown.down');
        await wrapper.find('input').trigger('keydown.up');
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
        await wrapper.trigger('keydown.enter');
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

        await wrapper.find('input').trigger('focus');
        await wrapper.findAll('[data-cy="ac-suggestion"]')[2].trigger('click');
        expect(wrapper.find('input').element.value).toEqual('Liabilities');
    });

    it('should not change input amount when amount couldnt be formatted', async () => {
         const wrapper = mount(InputWithLabel, {
            props: {
                value: '',
                type: 'number',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        await wrapper.find('input').setValue('32,122.11');
        await wrapper.find('input').trigger('blur');

        expect(wrapper.find('input').element.value).toEqual('32,122.11');

        await wrapper.find('input').setValue('a');
        await wrapper.find('input').trigger('blur');

        expect(wrapper.find('input').element.value).toEqual('a');

    });

    it('should emit numeric values for number fields', async () => {
         const wrapper = mount(InputWithLabel, {
            props: {
                value: '',
                type: 'number',
            },
        });

        await wrapper.find('input').setValue('32.122,11');

        expect(wrapper.emitted('change')[0][0]).toEqual('32122.11');

    });

    it('should show autocomplete menu only when input is focused', async() => {
         const wrapper = mount(InputWithLabel, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        expect(wrapper.find('[data-cy="container-autocomplete"]').element.classList.contains('hidden')).toBeTruthy();
        await wrapper.find('input').trigger('focus');
        expect(wrapper.find('[data-cy="container-autocomplete"]').element.classList.contains('hidden')).toBeFalsy();
        await wrapper.find('input').trigger('blur');
        expect(wrapper.find('[data-cy="container-autocomplete"]').element.classList.contains('hidden')).toBeTruthy();
    });

    it('should hide suggestion when input is identical to it', async() => {
         const wrapper = mount(InputWithLabel, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        await wrapper.find('input').trigger('focus');
        await wrapper.find('input').setValue('Asset');
        expect(wrapper.findAll('[data-cy="ac-suggestion"]').length).toEqual(1);
        await wrapper.find('input').setValue('Assets');
        expect(wrapper.findAll('[data-cy="ac-suggestion"]').length).toEqual(0);

    });

});


