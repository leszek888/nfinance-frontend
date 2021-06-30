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
 
    it('should display container with input fields', () => {
        const container = wrapper.find('.edited-transaction-container');
        const inputs = container.findAll('input');

        expect(inputs.length).toBe(6);
    });

    it('should fill out input fields with transaction data', () => {
        const container = wrapper.find('.edited-transaction-container');
        const payee_input = container.find("[name='payee']");
        const date_input = container.find("[name='date']");

        const entries = container.findAll('.edited-entry-container');

        expect(payee_input.element.value).toBe('Payee');
        expect(date_input.element.value).toBe('2020-01-01');
        expect(entries[0].find("[name='account']").element.value).toBe('Assets');
        expect(entries[0].find("[name='amount']").element.value).toBe('-5,00');
        expect(entries[1].find("[name='account']").element.value).toBe('Expenses');
        expect(entries[1].find("[name='amount']").element.value).toBe('5,00');
    });

    it('should remove entry when clicking remove button', () => {
        const entries = wrapper.findAll('.edited-entry-container');

        expect(wrapper.vm.transaction.entries.length).toBe(2);
        entries[0].find('button').element.click();

        expect(wrapper.vm.transaction.entries.length).toBe(1);
    });

    it('should add entry when clicking add entry button', () => {
        wrapper.find("[name='btn-add-entry']").element.click();
        expect(wrapper.vm.transaction.entries.length).toBe(3);
    });

});