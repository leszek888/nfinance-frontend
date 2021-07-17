import { mount } from '@vue/test-utils'
import InputWithLabel from '@/components/InputWithLabel.vue'

describe('InputWithLabel.vue', () => {
    it('should convert number to string, when input type is number', async () => {
        const wrapper = mount(InputWithLabel, {
            props: {
                value: '12345.44',
                type: 'number',
            } ,
        });
        expect(wrapper.find('input').element.value).toEqual('12.345,44');
    });

    it('should format number input after blur', async () => {
        const wrapper = mount(InputWithLabel, {
            props: {
                value: '',
                type: 'number',
            } ,
        });

        await wrapper.find('input').setValue('1234,5');
        await wrapper.find('input').trigger('blur');
        expect(wrapper.find('input').element.value).toEqual('1.234,50');
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

    it('should strip white spaces when emitting change', async () => {
         const wrapper = mount(InputWithLabel, {
            props: {
                value: ' Input: ',
            },
        });
        
        await wrapper.vm.handleChange();
        expect(wrapper.emitted('change')[0][0]).toEqual('Input:');
       
    });
});


