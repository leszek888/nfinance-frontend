import { mount } from '@vue/test-utils'
import FilterBox from '@/components/FilterBox'
import Filters from '@/components/Filters.vue'

describe('Filters.vue', () => {
    it('renders correctly', async () => {
        const wrapper = mount(Filters);

        expect(wrapper.findAllComponents(FilterBox).length).toBeGreaterThan(0);
    });
});


