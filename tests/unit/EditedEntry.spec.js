import { mount } from '@vue/test-utils'
import EditedEntry from '@/components/EditedEntry.vue'

describe('EditedEntry.vue', () => {
    beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });
    const mountEntry = (props) => {
        return mount(EditedEntry, {
            props: props ? props :
            {
                account: '',
                amount: '',
            },
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
        });
    };

    it('renders correctly', () => {
        const wrapper = mountEntry(null);
        expect(wrapper.findAll('input')).toHaveLength(2);
    });

    it('should emit update-entry on blur', async () => {
        const wrapper = mountEntry({ account: 'Assets', amount: '100' });

        wrapper.find('[data-cy="input-account"]').trigger('focusout');
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('update-entry')).toBeTruthy();
        expect(wrapper.emitted('update-entry')[0][0].account).toEqual('Assets');
        expect(wrapper.emitted('update-entry')[0][0].amount).toEqual('100');

    });
});
