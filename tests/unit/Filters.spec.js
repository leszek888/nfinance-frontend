import { mount } from '@vue/test-utils'
import FilterBox from '@/components/FilterBox'
import Filters from '@/components/Filters.vue'

describe('Filters.vue', () => {
    it('renders correctly', async () => {
        const wrapper = mount(Filters);

        expect(wrapper.findAllComponents(FilterBox).length).toBeGreaterThan(0);
    });

    it('updates filters when filters change', async() => {
        const wrapper = mount(Filters);

        wrapper.vm.updateFilters({ name: 'first', value: 'firstvalue' });
        expect(wrapper.vm.filters.length).toEqual(1);
        expect(wrapper.vm.filters[0].name).toEqual('first');
        expect(wrapper.vm.filters[0].value).toEqual('firstvalue');
        wrapper.vm.updateFilters({ name: 'second', value: 'secondvalue' });
        expect(wrapper.vm.filters.length).toEqual(2);
        wrapper.vm.updateFilters({ name: 'first', value: 'newfirstvalue' });
        expect(wrapper.vm.filters.length).toEqual(2);
        wrapper.vm.updateFilters({ name: 'second', value: '' });
        expect(wrapper.vm.filters.length).toEqual(1);
    });

    it('updates filter string when filters change', async() => {
        const wrapper = mount(Filters);

        wrapper.vm.updateFilters({ name: 'first', value: 'firstvalue' });
        expect(wrapper.vm.filtersString).toEqual('first=firstvalue');
        wrapper.vm.updateFilters({ name: 'second', value: 'secondvalue' });
        expect(wrapper.vm.filtersString).toContain('second=secondvalue');
        wrapper.vm.updateFilters({ name: 'first', value: 'newfirstvalue' });
        expect(wrapper.vm.filtersString).toContain('first=newfirstvalue');
        wrapper.vm.updateFilters({ name: 'second', value: '' });
        expect(wrapper.vm.filtersString).not.toContain('second=');

    });

});


