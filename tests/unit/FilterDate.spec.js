import { mount } from '@vue/test-utils'
import FilterDate from '@/components/FilterDate.vue'
import Filter from '@/components/Filter.vue'
import FilterBox from '@/components/FilterBox.vue'
import InputWithLabel from '@/components/InputWithLabel.vue'
 
describe('FilterDate.vue', () => {
    it('renders correctly', async() => {
        const wrapper = mount(FilterDate, {
            props: {
                title: 'FilterDate',
            },
        });

        expect(wrapper.findComponent(FilterBox).exists()).toBeTruthy();
        expect(wrapper.findComponent(FilterBox).findAllComponents(Filter)).toHaveLength(2);
    });

    it('updates dates after selecting period', async() => {
        const wrapper = mount(FilterDate, {
            props: {
                title: 'FilterDate',
            },
        });

        const dateStub = jest.spyOn(Date, 'now').mockImplementation(() => 1625517407660); // 2021-07-05
        wrapper.vm.$refs.periodselect.value = 'This Month';
        await wrapper.vm.updatePeriod();
        expect(wrapper.find('[name="date_from"] input').element.value).toEqual('2021-07-01');
        expect(wrapper.find('[name="date_to"] input').element.value).toEqual('2021-07-05');
        wrapper.vm.$refs.periodselect.value = 'Last Month';
        await wrapper.vm.updatePeriod();
        expect(wrapper.find('[name="date_from"] input').element.value).toEqual('2021-06-01');
        expect(wrapper.find('[name="date_to"] input').element.value).toEqual('2021-06-30');
        wrapper.vm.$refs.periodselect.value = 'This Year';
        await wrapper.vm.updatePeriod();
        expect(wrapper.find('[name="date_from"] input').element.value).toEqual('2021-01-01');
        expect(wrapper.find('[name="date_to"] input').element.value).toEqual('2021-07-05');
        dateStub.mockRestore();
    });

    it('emits both filters at once', async() => {
        const wrapper = mount(FilterDate, {
            props: {
                title: 'FilterDate',
            },
        });
        wrapper.vm.updatePeriod();
        expect(Array.isArray(wrapper.emitted('filter-update')[0][0])).toBeTruthy();
    });

});
