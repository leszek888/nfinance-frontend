import { mount } from '@vue/test-utils'
import InputWithAutocomplete from '@/components/InputWithAutocomplete.vue'

describe('InputWithAutocomplete.vue', () => {
    beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    it('renders with AutoComplete when suggestions are present and is focused', async () => {
        const wrapper = mount(InputWithAutocomplete, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        await wrapper.find('input').trigger('focus');
        expect(wrapper.find('[data-cy="container-autocomplete"]').exists()).toBeTruthy();
    });

    it('should display only first part of the suggestion when using autoCompleteType="splitted"', async () => {
        const wrapper = mount(InputWithAutocomplete, {
            props: {
                value: '',
                autoComplete: true,
                autoCompleteType: 'splitted',
                suggestionsList: ['Assets:Current:Bank', 'Assets:Fixed:House', 'Liabilities:Mortgage'],
            },
        });

        await wrapper.find('input').trigger('focus');
        expect(wrapper.html()).toContain('Assets');
        expect(wrapper.html()).not.toContain('Current');
        expect(wrapper.html()).not.toContain('Fixed');
        expect(wrapper.html()).not.toContain('Mortgage');
    });

    it('should append ":" to suggestion when there are sub-suggestions present', async() => {
         const wrapper = mount(InputWithAutocomplete, {
            props: {
                value: '',
                autoComplete: true,
                autoCompleteType: 'splitted',
                suggestionsList: ['Assets:Current:Bank', 'Assets:Fixed:House', 'Liabilities'],
            },
        });

        await wrapper.find('input').trigger('focus');
        await wrapper.find('input').setValue('A');
        await wrapper.find('input').trigger('keydown.enter');
        expect(wrapper.find('input').element.value).toEqual('Assets:');
        await wrapper.find('input').setValue('L');
        await wrapper.find('input').trigger('keydown.enter');
        expect(wrapper.find('input').element.value).toEqual('Liabilities');
        await wrapper.find('input').setValue('L');
    });

    it('should append sub-suggestion to input value', async() => {
         const wrapper = mount(InputWithAutocomplete, {
            props: {
                value: '',
                autoComplete: true,
                autoCompleteType: 'splitted',
                suggestionsList: ['Assets:Current:Bank', 'Assets:Fixed:House', 'Liabilities'],
            },
        });

        await wrapper.find('input').trigger('focus');
        await wrapper.find('input').setValue('A');
        await wrapper.find('input').trigger('keydown.enter');
        expect(wrapper.find('input').element.value).toEqual('Assets:');
        await wrapper.find('input').setValue(wrapper.find('input').element.value+'F');
        await wrapper.find('input').trigger('keydown.enter');
        expect(wrapper.find('input').element.value).toEqual('Assets:Fixed:');
    });
    it('should update suggestions when input has changed', async () => {
         const wrapper = mount(InputWithAutocomplete, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });       

        await wrapper.find('input').trigger('focus');
        await wrapper.find('input').setValue('e');
        expect(wrapper.findAll('[data-cy="ac-suggestion"]')).toHaveLength(1);
        expect(wrapper.findAll('[data-cy="ac-suggestion"]')[0].text()).toEqual('Equity');
    });

    it('marks first suggestion as selected when suggestions are given', async () => {
        const wrapper = mount(InputWithAutocomplete, {
            props: {
                value: '',
                type: 'number',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        await wrapper.find('input').trigger('focus');
        expect(wrapper.vm.currentSelection).toEqual(0);
        expect(wrapper.find('.selected').exists()).toBeTruthy();
        expect(wrapper.findAll('.selected')).toHaveLength(1);
    });

    it('should update current selection when up and down arrows are pressed', async () => {
        const wrapper = mount(InputWithAutocomplete, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        await wrapper.find('input').trigger('keydown.down');
        await wrapper.find('input').trigger('keydown.down');
        await wrapper.find('input').trigger('keydown.down');
        await wrapper.find('input').trigger('keydown.up');
        expect(wrapper.vm.currentSelection).toEqual(2);
    });

    it('should set input value to currently selected suggestion from autocomplete when hitting enter', async () => {
         const wrapper = mount(InputWithAutocomplete, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        wrapper.vm.currentSelection = 1;
        await wrapper.trigger('keydown.enter');
        expect(wrapper.find('input').element.value).toEqual('Equity');
    });

    it('should set input value to clicked suggestion', async () => {
        const wrapper = mount(InputWithAutocomplete, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        await wrapper.find('input').trigger('focus');
        wrapper.vm.checkClicks({ target: wrapper.findAll(
            '[data-cy="ac-suggestion"]')[2].element });
        await wrapper.vm.$nextTick();
        expect(wrapper.find('input').element.value).toEqual('Liabilities');
    });

    it('should show autocomplete menu only when input is focused', async() => {
         const wrapper = mount(InputWithAutocomplete, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        expect(wrapper.find('[data-cy="container-autocomplete"]').element.classList.contains('hidden')).toBeTruthy();
        await wrapper.find('input').trigger('focus');
        expect(wrapper.find('[data-cy="container-autocomplete"]').element.classList.contains('hidden')).toBeFalsy();
        await wrapper.find('input').trigger('keydown.tab');
        await new Promise((r) => setTimeout(r, 151));
        expect(wrapper.find('[data-cy="container-autocomplete"]').element.classList.contains('hidden')).toBeTruthy();
    });

    it('should hide suggestion when input is identical to it', async() => {
         const wrapper = mount(InputWithAutocomplete, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        await wrapper.find('input').trigger('focus');
        await wrapper.find('input').setValue('Asset');
        expect(wrapper.findAll('[data-cy="ac-suggestion"]').length).toEqual(1);
        await wrapper.find('input').setValue('Assets');
        expect(wrapper.findAll('[data-cy="ac-suggestion"]').length).toEqual(0);

    });

    it('should set currentSelection to a hovered suggestion', async () => {
        const wrapper = mount(InputWithAutocomplete, {
            props: {
                value: '',
                autoComplete: true,
                suggestionsList: ['Assets', 'Equity', 'Liabilities'],
            },
        });

        await wrapper.find('input').trigger('focus');
        await wrapper.findAll('[data-cy="ac-suggestion"]')[1].trigger('mouseover');

        expect(wrapper.vm.currentSelection).toEqual(1);
    });

    it('should strip white spaces when emitting change', async () => {
         const wrapper = mount(InputWithAutocomplete, {
            props: {
                value: ' Input: ',
            },
        });
        
        await wrapper.vm.handleChange();
        expect(wrapper.emitted('change')[0][0]).toEqual('Input:');
       
    });
    it('should strip ":" at the end of inputs value by splitted autocomplete', async () => {
         const wrapper = mount(InputWithAutocomplete, {
            props: {
                value: 'Input:',
                autoComplete: true,
                autoCompleteType: 'splitted',
            },
        });
        
        await wrapper.vm.handleChange();
        expect(wrapper.emitted('change')[0][0]).toEqual('Input');
    });

});


