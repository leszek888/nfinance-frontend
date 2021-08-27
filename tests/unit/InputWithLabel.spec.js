import { mount } from '@vue/test-utils'
import InputWithLabel from '@/components/InputWithLabel.vue'

describe('InputWithLabel.vue', () => {
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


