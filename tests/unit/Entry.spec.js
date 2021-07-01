import { mount } from '@vue/test-utils'
import Entry from '@/components/Entry.vue'

describe('Entry.vue', () => {
    it('renders correctly', () => {
        const wrapper = mount(Entry, {
            props: {
                account: 'Assets',
                amount: '32'
            },
        });

        console.log(wrapper.html());
        expect(wrapper.html()).toContain('Assets');
        expect(wrapper.html()).toContain('32,00');
    });
});


