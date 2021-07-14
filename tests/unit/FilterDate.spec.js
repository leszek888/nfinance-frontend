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
        expect(wrapper.findComponent(InputWithLabel).exists()).toBeTruthy();
    });

    it('updates dates after selecting period', async() => {
        const wrapper = mount(FilterDate, {
            props: {
                title: 'FilterDate',
            },
        });

        const dateStub = jest.spyOn(Date, 'now').mockImplementation(() => 1625517407660); // 2021-07-05
        await wrapper.vm.updatePeriod('This Month');
        expect(wrapper.find('[name="date_from"] input').element.value).toEqual('2021-07-01');
        expect(wrapper.find('[name="date_to"] input').element.value).toEqual('2021-07-05');
        await wrapper.vm.updatePeriod('Last Month');
        expect(wrapper.find('[name="date_from"] input').element.value).toEqual('2021-06-01');
        expect(wrapper.find('[name="date_to"] input').element.value).toEqual('2021-06-30');
        await wrapper.vm.updatePeriod('This Year');
        expect(wrapper.find('[name="date_from"] input').element.value).toEqual('2021-01-01');
        expect(wrapper.find('[name="date_to"] input').element.value).toEqual('2021-07-05');
        dateStub.mockRestore();
    });

});
