import { mount } from '@vue/test-utils'
import FilterBox from '@/components/FilterBox.vue'
 
describe('FilterBox.vue', () => {
    it('renders correctly', async() => {
        const wrapper = mount(FilterBox, {
            props: {
                title: 'FilterTitle',
            },
        });
        expect(wrapper.find('[data-cy="container-filterbox"]').exists()).toBeTruthy();
        expect(wrapper.find('[data-cy="container-filterbox"]').html()).toContain('FilterTitle');
    });
});
