import Vue from 'vue'
import Alert from '@/views/Alert.vue'
//import VueRouter from '@/router'
import Vuetify from 'vuetify'
import { createLocalVue, shallowMount } from '@vue/test-utils'

Vue.use(Vuetify)

describe('Alert.vue', () => {
  let wrapper
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuetify)
    wrapper = shallowMount(Alert, {
      localVue,
      propsData: {
        message: 'Lorem ipsum',
        color: 'deep-purple lighten-2',
        icon: 'mdi-history',
      },
    })
  })

  it('Render the Alert.vue instance', () => {
    //expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.vm).toBeTruthy()
  })

  it('Correct default prop values ', () => {
    //console.log(wrapper.find('#register').props('disabled'))
    expect(wrapper.props().message).toBe('Lorem ipsum')
    expect(wrapper.props().color).toBe('deep-purple lighten-2')
    expect(wrapper.props().icon).toBe('mdi-history')
  })

  it('Change props values', async () => {
    wrapper.setProps({ message: 'bar' })
    await wrapper.vm.$nextTick()
    expect(wrapper.props().message).toBe('bar')
  })
})
