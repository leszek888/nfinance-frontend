import { mount } from '@vue/test-utils'
import Entry from '@/components/Entry.vue'

describe('Entry.vue', () => {
    it('renders correctly', async () => {
        const wrapper = mount(Entry, {
            props: {
                account: 'Assets',
                amount: '32'
            },
        });

        expect(wrapper.html()).toContain('Assets');
        expect(wrapper.html()).toContain('32,00');
    });
});


