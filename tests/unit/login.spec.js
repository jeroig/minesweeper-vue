import Vue from 'vue'
import Login from '@/views/Login.vue'
import VueRouter from '@/router'
import Vuetify from 'vuetify'
import { createLocalVue, shallowMount } from '@vue/test-utils'

Vue.use(Vuetify)

describe('Login.vue', () => {
  let wrapper
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuetify)
    wrapper = shallowMount(Login, {
      localVue,
      VueRouter,
    })
  })

  it('Render the Login.vue instance', () => {
    expect(shallowMount(Login).isVueInstance()).toBe(true)
  })

  it('Show inactive "Register" button', () => {
    //console.log(wrapper.find('#register').props('disabled'))
    const registerButton = wrapper.find('#register')
    expect(registerButton.props('disabled')).toBe(true)
  })

  it('Show active "Register" button', async () => {
    wrapper.setData({ isFormValid: true })
    await wrapper.vm.$nextTick()
    const registerButton = wrapper.find('#register')
    expect(registerButton.props('disabled')).toBe(false)
  })

  it('Show inactive "Login" button', () => {
    const registerButton = wrapper.find('#login')
    expect(registerButton.props('disabled')).toBe(true)
  })

  it('Show active "Login" button', async () => {
    wrapper.setData({ isFormValid: true })
    await wrapper.vm.$nextTick()
    const registerButton = wrapper.find('#login')
    expect(registerButton.props('disabled')).toBe(false)
  })
})
