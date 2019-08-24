import { shallowMount } from '@vue/test-utils'
import ConnectionAware from '@/components/ConnectionAware.vue'

describe('ConnectionAware.vue', () => {
  it('renders props.minEffectiveType when passed', () => {
    const minEffectiveType = '3g'      
    
    global.navigator.connection = jest.fn();
    
    const wrapper = shallowMount(ConnectionAware, {
        propsData: { minEffectiveType }
    })

    expect(wrapper.text()).toMatch(minEffectiveType);
  })
})
