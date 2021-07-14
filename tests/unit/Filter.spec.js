import { mount } from '@vue/test-utils'
import Filter from '@/components/Filter.vue'
 
describe('Filter.vue', () => {
    it('renders correctly', async () => {
        const wrapper = mount(Filter, {
            props: {
                name: 'test-filter',
                value: 'Test Value',
            },
        });

        expect(wrapper.find('[data-cy="container-filter"]').exists()).not.toBeFalsy();
        expect(wrapper.find('[data-cy="container-filter"]').attributes('name')).toEqual('test-filter');
        expect(wrapper.findAll('[data-cy="container-filter"] input')).toHaveLength(1);
        expect(wrapper.find('[data-cy="container-filter"] input').element.value).toEqual('Test Value');
    });

    it('emits filter event with name and value on submit', () => {
        const wrapper = mount(Filter, {
            props: {
                name: 'test-filter',
            }
        });

        wrapper.find('[data-cy="container-filter"] input').setValue('filter value');
        wrapper.find('[data-cy="container-filter"] input').trigger('keydown.enter');
        expect(wrapper.emitted('filter-update')).toBeTruthy();
        expect(wrapper.emitted('filter-update')[0][0].name).toEqual('test-filter');
        expect(wrapper.emitted('filter-update')[0][0].value).toEqual('filter value');
    });

    it('emits filter event on blur', () => {
        const wrapper = mount(Filter, {
            props: {
                name: 'test-filter',
                value: 'blur filter',
            }
        });

        wrapper.find('[data-cy="container-filter"] input').trigger('blur');
        expect(wrapper.emitted('filter-update')).toBeTruthy();
        expect(wrapper.emitted('filter-update')[0][0].name).toEqual('test-filter');
        expect(wrapper.emitted('filter-update')[0][0].value).toEqual('blur filter');
    });

});
