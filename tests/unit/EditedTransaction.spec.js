import { mount } from '@vue/test-utils'
import EditedTransaction from '@/components/EditedTransaction.vue'

describe('EditedTransaction.vue', () => {
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
        expect(entries[0].find("[data-cy='input-amount']").element.value).toBe('-5,00');
        expect(entries[1].find("[data-cy='input-account']").element.value).toBe('Expenses');
        expect(entries[1].find("[data-cy='input-amount']").element.value).toBe('5,00');
    });

    it('should remove entry when clicking remove button', () => {
        const wrapper = mountWrapper(null);
        const entries = wrapper.findAll('.edited-entry-container');

        expect(wrapper.vm.transaction.entries.length).toBe(2);
        entries[0].find('button').element.click();

        expect(wrapper.vm.transaction.entries.length).toBe(1);
    });

    it('should add entry when clicking add entry button', () => {
        const wrapper = mountWrapper(null);
        wrapper.find('[data-cy="btn-add-entry"]').element.click();
        expect(wrapper.vm.transaction.entries.length).toBe(3);
    });

    it('should create array with five last dates for date input autocomplete', () => {
        const wrapper = mountWrapper(null);
        const dateStub = jest.spyOn(Date, 'now').mockImplementation(() => 1625517407660); // 2021-07-05

        const days = wrapper.vm.getLastDays(5);
        expect(days).toEqual(['2021-07-05', '2021-07-04', '2021-07-03', '2021-07-02', '2021-07-01']);

        dateStub.mockRestore();
    });

    it('should pass array with five last days to input date upon creation', () => {
        const wrapper = mountWrapper(null);
        expect(wrapper.findComponent({name: 'InputWithAutocomplete'}).props().suggestionsList.length).toBeGreaterThan(0);
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

    it('should not allow to save when date is invalid', async () => {
        const wrapper = mountWrapper({ ...transaction, date: '2021-02-01a' });

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
