import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timer: 0,
    rows: 4,
    columns: 4,
    mines: 1,
    state: "playing",
    restart: 0
  },
  getters: {},
  mutations: {
    restartGame(state, data) {
      state.rows = data.board.rows;
      state.columns = data.board.columns;
      state.mines = data.board.mines;
      state.state = data.board.state;
      state.timer = 0;
      state.restart++;
    },
    increment(state) {
      state.timer++;
    }
  },
  actions: {
    asyncRestart: ({ commit }, newValues) => {
      EventService.newGame(newValues.rows, newValues.columns, newValues.mines)
        .then(response => {
          console.log(response.data);
          commit("restartGame", response.data);
        })
        .catch(error => {
          console.log('There was an error:', error.response) // Logs out the error
        });
      /*
      setTimeout( () => {
          Api().get.......
      }, 500);
      */
    }
  }
});
