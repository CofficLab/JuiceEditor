import { mount } from '@vue/test-utils'
import Button from '../../src/ui/Button.vue'

describe('Button', () => {
    test('renders correctly', () => {
        const wrapper = mount(Button)
        expect(wrapper.html()).toContain('dropdown dropdown-hover')
    })
})
