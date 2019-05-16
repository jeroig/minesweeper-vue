import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timer: 0,
    rows: 9,
    columns: 9,
    mines: 10,
    state: 'playing',
    restart: 0
  },
  getters: {
  },
  mutations: {
    restartGame(state, data) {
      state.rows = data.board.rows
      state.columns = data.board.columns
      state.mines = data.board.mines
      state.state = data.board.state
      state.restart++;
    },
    increment(state) {
      state.timer++
    }
  },
  actions: {
    asyncRestart: ({ commit }, newValues ) => {
      setTimeout( () => {
          fetch(
            "http://localhost:3000/api/game/reset/" +
              newValues.rows + "/" +
              newValues.columns + "/" +
              newValues.mines + ".json"
          )
          .then(response => response.json())
          .then(data => {
              console.log(data);
              commit('restartGame', data)
          });
      }, 500);
    }
  }
});
