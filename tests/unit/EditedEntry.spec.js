import { mount } from '@vue/test-utils'
import EditedEntry from '@/components/EditedEntry.vue'

describe('EditedEntry.vue', () => {
    it('should emit update-entry on blur', async () => {
        const wrapper = mount(EditedEntry, {
            props: {
                account: 'Assets',
                amount: '100',
            },
        });

        wrapper.find('[data-cy="input-account"]').trigger('focusout');
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted('update-entry')).toBeTruthy();
        expect(wrapper.emitted('update-entry')[0][0].account).toEqual('Assets');
        expect(wrapper.emitted('update-entry')[0][0].amount).toEqual('100');

    });

});
