import { mount } from '@vue/test-utils'
import Transaction from '@/components/Transaction.vue'

describe('Transaction.vue', () => {

    const transaction = {
        id: 1,
        date: '2020-01-01',
        payee: 'Payee',
        entries: [
            { account: 'Assets', amount: '-5' },
            { account: 'Expenses', amount: '5' },
        ],
    };

    it('renders header with date and payee', () => {
        const wrapper = mount(Transaction, {
            props: {
                transaction: transaction,
            }
        })

        const header = wrapper.find('.header');
        expect(header.text()).toContain(transaction.date);
        expect(header.text()).toContain(transaction.payee);
    });

    it('renders list of all transaction\'s entries in right order', () => {
        const wrapper = mount(Transaction, {
            props: {
                transaction: transaction,
            }
        })
         
        const entries = wrapper.findAll('.entry-container');

        expect(entries.length).toEqual(2);
        expect(entries[0].text()).toContain(transaction.entries[0].account);
        expect(entries[0].text()).toContain(transaction.entries[0].amount);
        expect(entries[1].text()).toContain(transaction.entries[1].account);
        expect(entries[1].text()).toContain(transaction.entries[1].amount);
    });
})
