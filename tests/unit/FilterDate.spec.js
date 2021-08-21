import { mount } from '@vue/test-utils'
import FilterDate from '@/components/FilterDate.vue'
import FilterBox from '@/components/FilterBox.vue'
 
describe('FilterDate.vue', () => {
    it('renders correctly', async() => {
        const wrapper = mount(FilterDate, {
            props: {
                title: 'FilterDate',
            },
        });

        expect(wrapper.findComponent(FilterBox).exists()).toBeTruthy();
    });

    it('updates dates after selecting period', async() => {
        const wrapper = mount(FilterDate, {
            props: {
                title: 'FilterDate',
            },
        });
 
        const dateStub = jest.spyOn(Date, 'now').mockImplementation(() => 1625517407660); // 2021-07-05
        wrapper.vm.currentPeriod = 'This Month';
        await wrapper.vm.updateSelection();
        expect(wrapper.vm.value_from).toEqual('2021-07-01');
        expect(wrapper.vm.value_to).toEqual('2021-07-05');
        wrapper.vm.currentPeriod = 'Last Month';
        await wrapper.vm.updateSelection();
        expect(wrapper.vm.value_from).toEqual('2021-06-01');
        expect(wrapper.vm.value_to).toEqual('2021-06-30');
        wrapper.vm.currentPeriod = 'This Year';
        await wrapper.vm.updateSelection();
        expect(wrapper.vm.value_from).toEqual('2021-01-01');
        expect(wrapper.vm.value_to).toEqual('2021-07-05');
        dateStub.mockRestore();
    });

    it('emits both filters at once', async() => {
        const wrapper = mount(FilterDate, {
            props: {
                title: 'FilterDate',
            },
        });
        wrapper.vm.emitAll();
        expect(Array.isArray(wrapper.emitted('filter-update')[0][0])).toBeTruthy();
    });

});
