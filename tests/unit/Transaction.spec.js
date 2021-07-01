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

    it('emits edit-transaction when clicked', async () => {
        const wrapper = mount(Transaction, {
            props: {
                transaction: transaction,
            }
        })

        wrapper.find('[data-cy="btn-edit-transaction"]').trigger('click');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('edit-transaction')).toBeTruthy();
        expect(wrapper.emitted('edit-transaction')[0][0]).toEqual(transaction.id);
    });

    it('adds positive or negative balance class when Assets are positive/negative', () => {
        transaction.entries[0].amount = '-10';
        transaction.entries[1].amount = '10';
        const wrapper = mount(Transaction, {
            props: { transaction: transaction },
        })

        expect(wrapper.find('.negative-balance').exists()).toBeTruthy();
        expect(wrapper.find('.positive-balance').exists()).toBeFalsy();

        transaction.entries[0].amount = '10';
        transaction.entries[1].amount = '-10';

        const wrapper2 = mount(Transaction, {
            props: { transaction: transaction },
        })
        
        expect(wrapper2.find('.negative-balance').exists()).toBeFalsy();
        expect(wrapper2.find('.positive-balance').exists()).toBeTruthy();

    });

})
