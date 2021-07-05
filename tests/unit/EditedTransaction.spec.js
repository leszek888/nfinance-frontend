import { mount } from '@vue/test-utils'
import EditedTransaction from '@/components/EditedTransaction.vue'

describe('EditedTransaction.vue', () => {

    const transaction = {
        id: 1,
        date: '2020-01-01',
        payee: 'Payee',
        entries: [
            { account: 'Assets', amount: '-5' },
            { account: 'Expenses', amount: '5' },
        ],
    };

    let wrapper = null;

    beforeEach(() => {
        wrapper = mount(EditedTransaction, {
            props: {
                date: transaction.date,
                payee: transaction.payee,
                entries: transaction.entries,
            }
        });

    });
 
    it('renders correctly', () => {
        const container = wrapper.find('.edited-transaction-container');
        const inputs = container.findAll('input');

        expect(inputs.length).toBe(6);
    });
 
    it('should fill out input fields with passed transaction data', async () => {
        const container = wrapper.find('[data-cy="container-edit-transaction"]');
        const payee_input = container.find('[data-cy="input-payee"]');
        const date_input = container.find('[data-cy="input-date"]');

        const entries = container.findAll('.edited-entry-container');

        expect(payee_input.element.value).toBe('Payee');
        expect(date_input.element.value).toBe('2020-01-01');
        expect(entries[0].find("[data-cy='input-account']").element.value).toBe('Assets');
        expect(entries[0].find("[data-cy='input-amount']").element.value).toBe('-5,00');
        expect(entries[1].find("[data-cy='input-account']").element.value).toBe('Expenses');
        expect(entries[1].find("[data-cy='input-amount']").element.value).toBe('5,00');
    });

    it('should remove entry when clicking remove button', () => {
        const entries = wrapper.findAll('.edited-entry-container');

        expect(wrapper.vm.transaction.entries.length).toBe(2);
        entries[0].find('button').element.click();

        expect(wrapper.vm.transaction.entries.length).toBe(1);
    });

    it('should add entry when clicking add entry button', () => {
        wrapper.find('[data-cy="btn-add-entry"]').element.click();
        expect(wrapper.vm.transaction.entries.length).toBe(3);
    });

    it('should create array with five last dates for date input autocomplete', () => {
        const realDate = Date.now.bind(global.Date);
        const dateStub = jest.fn(() => 1625517407660); // 2021-07-05
        global.Date.now = dateStub;

        const days = wrapper.vm.getLastDays(5);
        expect(days).toEqual(['2021-07-05', '2021-07-04', '2021-07-03', '2021-07-02', '2021-07-01']);

        global.Date.now = realDate;
    });

    it('should pass array with five last days to input date upon creation', () => {
        expect(wrapper.findComponent({name: 'InputWithLabel'}).props().autoComplete).toBeTruthy();
        expect(wrapper.findComponent({name: 'InputWithLabel'}).props().suggestionsList.length).toBeGreaterThan(0);
    });

});
