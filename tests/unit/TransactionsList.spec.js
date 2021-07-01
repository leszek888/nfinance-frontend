import { mount } from '@vue/test-utils'
import Transaction from '@/components/Transaction.vue'
import TransactionsList from '@/components/TransactionsList.vue'
 
describe('TransactionsList.vue', () => {
    const createTransaction = (id) => {
        return {
            'id': id,
            'date': '2020-01-01',
            'payee': 'Payee'+id,
            'entries': [
                { 'account': 'Debit', 'amount': '10' },
                { 'account': 'Credit', 'amount': '-10' },
            ],
        }
    }

    const transactions = [];

    beforeEach(() => {
        for (let i = 0; i !== 10; i++) {
            transactions.push(createTransaction(i+1));
        }
    });

    it('renders all passed transactions', () => {
        const wrapper = mount(TransactionsList, {
            props: { transactions: transactions },
        });
        expect(wrapper.findAllComponents(Transaction)).toHaveLength(10);
    });

});
