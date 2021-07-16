import { mount } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'

describe('NavBar.vue', () => {
    it('renders correctly', () => {
        const wrapper = mount(NavBar)

        expect(wrapper.find('nav').exists()).toBeTruthy();
    });
});
 
