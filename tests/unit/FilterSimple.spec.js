import { mount } from '@vue/test-utils'
import FilterSimple from '@/components/FilterSimple.vue'
import Filter from '@/components/Filter.vue'
import FilterBox from '@/components/FilterBox.vue'
 
describe('FilterSimple.vue', () => {
    it('renders correctly', async() => {
        const wrapper = mount(FilterSimple, {
            props: {
                title: 'FilterTitle',
                value: 'FilterValue',
            },
        });

        expect(wrapper.findComponent(FilterBox).exists()).toBeTruthy();
        expect(wrapper.findComponent(FilterBox).findAllComponents(Filter)).toHaveLength(1);
        expect(wrapper.findComponent(FilterBox).findComponent(Filter).vm.value).toEqual('FilterValue');
    });

    it('forwards events emitted by filters', async() => {
         const wrapper = mount(FilterSimple, {
            props: {
                title: 'FilterTitle',
                name: 'filtername',
                value: 'FilterValue',
            },
        });

        await wrapper.getComponent(Filter).find('input').trigger('blur');
        expect(wrapper.getComponent(Filter).emitted('filter-update')).toBeTruthy();
        expect(wrapper.emitted('filter-update')).toBeTruthy();
        expect(wrapper.emitted('filter-update')[0][0].name).toEqual('filtername');
    });
}); 
