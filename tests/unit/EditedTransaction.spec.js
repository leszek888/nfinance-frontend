import { mount } from '@vue/test-utils'
import EditedTransaction from '@/components/EditedTransaction.vue'

describe('EditedTransaction.vue', () => {
    beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });
    const transaction = {
        date: '2020-01-01',
        payee: 'Payee',
        entries: [
            { account: 'Assets', amount: '-5' },
            { account: 'Expenses', amount: '5' },
        ],
    };

    const mountWrapper = (props) => {
        return mount(EditedTransaction, {
            global: {
                mocks: {
                    $store: {
                        getters: {
                            getAccounts: [
                                { name: 'Assets' },
                                { name: 'Liabilities' },
                                { name: 'Equity' },
                            ],
                        },
                    },
                },
            },
            props: props ? props :
            {
                date: transaction.date,
                payee: transaction.payee,
                entries: transaction.entries,
            },
        });
    };

    it('renders correctly', () => {
        const wrapper = mountWrapper(null);
        const container = wrapper.find('.edited-transaction-container');
        const inputs = container.findAll('input');

        expect(inputs.length).toBe(6);
    });
  
    it('should fill out input fields with passed transaction data', async () => {
        const wrapper = mountWrapper(null);
        const container = wrapper.find('[data-cy="container-edit-transaction"]');
        const payee_input = container.find('[data-cy="input-payee"]');
        const date_input = container.find('[data-cy="input-date"]');

        const entries = container.findAll('.edited-entry-container');

        expect(payee_input.element.value).toBe('Payee');
        expect(date_input.element.value).toBe('2020-01-01');
        expect(entries[0].find("[data-cy='input-account']").element.value).toBe('Assets');
        expect(entries[0].find("[data-cy='input-amount']").element.value).toBe('-5');
        expect(entries[1].find("[data-cy='input-account']").element.value).toBe('Expenses');
        expect(entries[1].find("[data-cy='input-amount']").element.value).toBe('5');
    });

    it('should remove entry when clicking remove button', () => {
        const wrapper = mountWrapper(null);
        const entries = wrapper.findAll('.edited-entry-container');
        wrapper.find('[data-cy="btn-add-entry"]').element.click();

        expect(wrapper.vm.transaction.entries.length).toBe(3);
        entries[0].find('button').element.click();

        expect(wrapper.vm.transaction.entries.length).toBe(2);
    });

    it('should clear entry instead of removing it when remove button clicked and entry count is 2', () => {
        const wrapper = mountWrapper(null);
        const entries = wrapper.findAll('.edited-entry-container');

        expect(wrapper.vm.transaction.entries.length).toBe(2);
        entries[0].find('button').element.click();

        expect(wrapper.vm.transaction.entries.length).toBe(2);
    });

    it('should add entry when clicking add entry button', () => {
        const wrapper = mountWrapper(null);
        wrapper.find('[data-cy="btn-add-entry"]').element.click();
        expect(wrapper.vm.transaction.entries.length).toBe(3);
    });

    it('should not allow to save when there are empty inputs', async () => {
        const wrapper = mountWrapper({ ...transaction, date: '', payee: ''});

        await wrapper.find('[data-cy="btn-save-transaction"]').trigger('click');
        expect(wrapper.emitted('save-transaction')).toBeFalsy();
    });

    it('should not allow to save when amounts are invalid', async () => {
        const wrapper = mountWrapper({ ...transaction, entries:
                [
                    { account: 'Assets', amount: '33a' },
                    { account: 'Equity', amount: '33' }
                ]
            });

        await wrapper.find('[data-cy="btn-save-transaction"]').trigger('click');
        expect(wrapper.emitted('save-transaction')).toBeFalsy();
    });

    it('should display unbalanced amount when transaction is not balanced', async() => {
        const wrapper = mountWrapper({ ...transaction, entries: [
            { account: 'Assets', amount: '33' },
            { account: 'Equity', amount: '' },
        ]});

        await wrapper.find('[data-cy="container-edited-entry"]').find('[data-cy="input-amount"]').trigger('blur');
        expect(wrapper.find('[data-cy="field-unbalanced-amount"]').html()).toContain('-33,00');
    });

    it('should not allow saving when transaction is not balanced', async() => {
        const wrapper = mountWrapper({ ...transaction, entries: [
            { account: 'Assets', amount: '33' },
            { account: 'Equity', amount: '-23' },

        ]});
        await wrapper.find('[data-cy="btn-save-transaction"]').trigger('click');
        expect(wrapper.emitted('save-transaction')).toBeFalsy();
    });

});
