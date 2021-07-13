import { mount } from '@vue/test-utils'
import FilterValue from '@/components/FilterValue.vue'
 
describe('FilterValue.vue', () => {
    it('renders correctly', async () => {
        const wrapper = mount(FilterValue);

        expect(wrapper.find('[data-cy="container-filter"]').exists()).not.toBeFalsy();
        expect(wrapper.findAll('[data-cy="container-filter"] input')).toHaveLength(1);
    });

    it('emits filter event with name and value on submit', () => {
        const wrapper = mount(FilterValue, {
            props: {
                name: 'test-filter',
            }
        });

        wrapper.find('[data-cy="container-filter"] input').setValue('filter value');
        wrapper.find('[data-cy="container-filter"] input').trigger('keydown.enter');
        expect(wrapper.emitted('filter-update')).toBeTruthy();
        expect(wrapper.emitted('filter-update')[0][0].name).toEqual('test-filter');
        expect(wrapper.emitted('filter-update')[0][0].type).toEqual('value');
        expect(wrapper.emitted('filter-update')[0][0].value).toEqual('filter value');
    });
});


