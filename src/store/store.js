import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    restart: 0,
    game: {
      timer: 0,
      state: "playing",
      board: {
        rows: 4,
        columns: 4,
        mines: 1,
        cells: null
      }
    }
  },
  getters: {},
  mutations: {
    restartGame(state, data) {
      state.restart++;
      state.game = data.game;
    },

    beginTimer(state) {
        setInterval(function(){
          if (state.game.state == 'playing'){
            state.game.timer++;
          }
        }, 1000);
      //state.game.timer++;
    },

    setGameOver(state, newState) {
      state.game.state = newState;
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
          console.log("There was an error:", error.response); // Logs out the error
        });
    },

    asyncGameState: ({ commit }, newValue) => {
      if ((newValue == 'looser') || (newValue == 'winner')) {
        commit("setGameOver", newValue);
      }
    },
  }
});
