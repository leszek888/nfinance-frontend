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
                value: '12345.44',
                type: 'number',
                autocomplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            } ,
        });

        expect(wrapper.find('[data-cy="container-autocomplete"]').exists()).toBeTruthy();
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
                autocomplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        wrapper.find('input').trigger('keydown.down');
        expect(wrapper.vm.currentSelection).toEqual(1);

        wrapper.find('input').trigger('keydown.down');
        expect(wrapper.vm.currentSelection).toEqual(2);

        wrapper.find('input').trigger('keydown.down');
        expect(wrapper.vm.currentSelection).toEqual(0);

        wrapper.find('input').trigger('keydown.up');
        expect(wrapper.vm.currentSelection).toEqual(2);
    });

    it('should set input value to currently selected suggestion from autocomplete when hitting enter', async () => {
         const wrapper = mount(InputWithLabel, {
            props: {
                value: '',
                autocomplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        wrapper.vm.currentSelection = 1;
        wrapper.vm.onEnter();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('input').element.value).toEqual('Equity');
    });

});


