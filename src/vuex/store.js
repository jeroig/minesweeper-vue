import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
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
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      EventService.setHeaderCommon(userData.token)
    },
    CLEAR_USER_DATA(state) {
      //state.user = null;
      localStorage.removeItem('user')
      //EventService.setHeaderCommon(null);
      location.reload()
    },
    RESTART_GAME(state, data) {
      clearInterval(state.game.interval_id)
      state.game = data.game
      state.game.interval_id = setInterval(function () {
        if (state.game.state == 'playing') {
          state.game.timer++
        }
      }, 1000)
      //state.game.interval_id = t;
    },
    SET_GAME_OVER(state, data) {
      state.game.state = data.state
      state.game.timer = data.timer
    },
    SET_CELL_STATE(state, data) {
      let cell = state.game.board.cells.find(
        (cell) => cell.row == data.row && cell.col == data.col
      )
      cell.state = data.newState
      cell.value = data.value
    },
  },
  actions: {
    asyncRestart: ({ commit }, newValues) => {
      EventService.newGame(newValues.rows, newValues.columns, newValues.mines)
        .then((response) => {
          //console.log(response.data)
          commit('RESTART_GAME', response.data)
        })
        .catch((error) => {
          console.log('There was an error:', error.response) // Logs out the error
        })
    },
    asyncSetCellState: ({ commit, state }, values) => {
      EventService.setState(
        state.game.id,
        values.newState,
        values.row,
        values.col
      )
        .then((response) => {
          commit('SET_CELL_STATE', {
            row: response.data.cell.row,
            col: response.data.cell.col,
            newState: response.data.cell.state,
            value: response.data.cell.value,
          })
          if (
            response.data.state == 'loser' ||
            response.data.state == 'winner'
          ) {
            commit('SET_GAME_OVER', response.data)
          }
        })
        .catch((error) => {
          console.log('There was an error asyncSetCellState:' + error.response)
        })
    },
    asyncClickCell: ({ commit, state }, cell) => {
      EventService.setState(state.game.id, 'click', cell.row, cell.col)
        .then((response) => {
          //console.log(response.data)
          if (response.data.was_clicked == false) {
            commit('SET_CELL_STATE', {
              row: response.data.cell.row,
              col: response.data.cell.col,
              newState: response.data.cell.state,
              value: response.data.cell.value,
            })
            if (
              response.data.state == 'loser' ||
              response.data.state == 'winner'
            ) {
              commit('SET_GAME_OVER', response.data)
            }
            // Hacemos click en todos los vecinos con value 0
            if (response.data.cell.value === 0) {
              response.data.neighbors.map((neighbor_cell) => {
                cell.updateNeighbor(neighbor_cell)
              })
            }
          } else {
            //console.log('Ya fue clickeado: ' + cell.row + '_' + cell.col)
          }
        })
        .catch((error) => {
          //console.log('There was an error asyncClickCell:', error)
          console.log('There was an error asyncClickCell:', error.response)
        })
    },
    register: ({ commit }, credentials) => {
      //console.log('--- Store begin --');
      //console.log(credentials);
      let router = credentials['router']
      delete credentials['router']
      //console.log(credentials);
      //console.log('--- Store end -- ');
      EventService.newUser(credentials)
        .then((response) => {
          //console.log(response.data);
          commit('SET_USER_DATA', response.data)
          router.push({
            name: 'minesweeper',
          })
        })
        .catch((error) => {
          //console.log("There was an error:", error.response);
          Vue.$swal(
            'Oops! ' + error.response.data.error,
            'Please enter correct email & password',
            'error'
          )
        })
    },
    login: ({ commit }, credentials) => {
      let router = credentials['router']
      delete credentials['router']
      EventService.login(credentials)
        .then((response) => {
          commit('SET_USER_DATA', response.data)
          router.push({
            name: 'minesweeper',
          })
        })
        .catch((error) => {
          Vue.$swal(
            //"Oops! " + error,
            'Oops! ' + error.response.data.error,
            'Please enter correct email & password',
            'error'
          )
        })
    },
    logout: ({ commit }) => {
      commit('CLEAR_USER_DATA')
    },
  },
  getters: {
    gameId: (state) => {
      return !!state.game.id
    },
    gameTime: (state) => {
      return state.game.timer
    },
    gameState: (state) => {
      return state.game.state
    },
    cell: (state) => (row, col) => {
      if (state.game.board.cells === null) return ''
      return state.game.board.cells.find(
        (cell) => cell.row == row && cell.col == col
      )
    },
    loggedId: (state) => {
      return !!state.user
    },
  },
})
