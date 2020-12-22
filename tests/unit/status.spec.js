import Vue from 'vue'
import Vuex from 'vuex'
import Status from '@/components/Status.vue'
//import VueRouter from '@/router'
import Vuetify from 'vuetify'
import { createLocalVue, shallowMount } from '@vue/test-utils'

import Alert from '@/views/Alert.vue'

Vue.use(Vuetify)

describe('Status.vue', () => {
  let wrapper
  const localVue = createLocalVue()
  beforeEach(() => {
    localVue.use(Vuetify)
    localVue.use(Vuex)
    let getters = {
      gameState: () => null,
      gameTime: () => 0,
    }

    let store = new Vuex.Store({
      state: {
        user: null,
        game: {
          id: null,
          timer: null,
          state: null,
          interval_id: 0,
          board: {
            rows: null,
            columns: null,
            mines: null,
            cells: null,
          },
        },
      },
      getters: {
        gameState: (state) => state.game.state,
        gameTime: () => 0,
      },
    })

    wrapper = shallowMount(Status, {
      localVue,
      store,
    })
  })

  it('Render the Status.vue instance', () => {
    //expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.vm).toBeTruthy()
  })

  it("Button must be 'Start' If not game playing ", () => {
    expect(wrapper.findComponent(Alert)).toBeTruthy() // Exist "Alert" component
    expect(wrapper.find('v-btn-stub').text()).toBe('Start') // Button Must be value "Start"
  })

  it("Button must be 'Restart' if game is playing", async () => {
    wrapper.vm.$store.state.game.state = 'playing'
    await wrapper.vm.$nextTick()
    expect(wrapper.find('v-btn-stub').text()).toBe('Restart') // Button Must be value "Restart"
  })

  it('Enable button for "Start/Restart" game if valid Form', async () => {
    expect(wrapper.find('v-btn-stub').props('disabled')).toBe(true)
    wrapper.setData({ isFormValid: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('v-btn-stub').props('disabled')).toBe(false)
  })
})
