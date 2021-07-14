import { mount } from '@vue/test-utils'
import FilterSimple from '@/components/FilterSimple.vue'
import Filter from '@/components/Filter.vue'
import FilterBox from '@/components/FilterBox.vue'
 
describe('FilterSimple.vue', () => {
    it('renders correctly', async() => {
        const wrapper = mount(FilterSimple, {
            props: {
                title: 'FilterTitle',
            },
        });

        expect(wrapper.findComponent(FilterBox).exists()).toBeTruthy();
        expect(wrapper.findComponent(FilterBox).findAllComponents(Filter)).toHaveLength(1);
    });
}); 
