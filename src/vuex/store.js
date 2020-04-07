import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    restart: 0,
    game: {
      timer: 0,
      state: "playing",
      interval_id: 0,
      board: {
        rows: 4,
        columns: 4,
        mines: 1,
        cells: null
      }
    }
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      EventService.setHeaderCommon(userData.token);
    },
    CLEAR_USER_DATA(state) {
      //state.user = null;
      localStorage.removeItem("user");
      //EventService.setHeaderCommon(null);
      location.reload();
    },
    RESTART_GAME(state, data) {
      clearInterval(state.game.interval_id);
      state.restart++;
      state.game = data.game;
      state.game.interval_id = setInterval(function() {
        if (state.game.state == "playing") {
          state.game.timer++;
        }
      }, 1000);
      //state.game.interval_id = t;
    },

    SET_GAME_OVER(state, newState) {
      state.game.state = newState;
    },

    SET_CELL_STATE(state, data) {
      state.game.board.cells[data.row][data.col].state = data.newState;
      //console.log('---------------------------');
      //console.log(data.row + '_' + data.col + ': ' + data.value);
      state.game.board.cells[data.row][data.col].value = data.value;
    }
  },
  actions: {
    asyncRestart: ({ commit }, newValues) => {
      EventService.newGame(newValues.rows, newValues.columns, newValues.mines)
        .then(response => {
          //console.log(response.data);
          commit("RESTART_GAME", response.data);
        })
        .catch(error => {
          console.log("There was an error:", error.response); // Logs out the error
        });
    },
    asyncGameState: ({ commit }, newValue) => {
      if (newValue == "looser" || newValue == "winner") {
        commit("SET_GAME_OVER", newValue);
      }
    },
    asyncSetCellState: ({ commit }, values) => {
      EventService.setState(values.newState, values.row, values.col)
        .then(response => {
          //console.log(response.data.cell)
          commit("SET_CELL_STATE", {
            row: response.data.cell.row,
            col: response.data.cell.col,
            newState: response.data.cell.state,
            value: response.data.cell.value
          });
          if (
            response.data.state == "looser" ||
            response.data.state == "winner"
          ) {
            commit("SET_GAME_OVER", response.data.state);
          }
        })
        .catch(error => {
          console.log("There was an error asyncSetCellState:" + error.response);
        });
    },
    asyncClickCell: ({ commit }, cell) => {
      EventService.setState("click", cell.row, cell.col)
        .then(response => {
          //console.log(response.data)
          if (response.data.was_clicked == false) {
            commit("SET_CELL_STATE", {
              row: response.data.cell.row,
              col: response.data.cell.col,
              newState: response.data.cell.state,
              value: response.data.cell.value
            });
            if (
              response.data.state == "looser" ||
              response.data.state == "winner"
            ) {
              commit("SET_GAME_OVER", response.data.state);
            }
            // Hacemos click en todos los vecinos con value 0
            if (response.data.cell.value === 0) {
              response.data.neighbors.map(neighbor_cell => {
                cell.updateNeighbor(neighbor_cell);
              });
            }
          } else {
            //console.log('Ya fue clickeado: ' + cell.row + '_' + cell.col)
          }
        })
        .catch(error => {
          console.log("There was an error asyncClickCell:", error.response);
        });
    },
    register: ({ commit }, credentials) => {
      let router = credentials["router"];
      delete credentials["router"];
      EventService.newUser(credentials)
        .then(response => {
          //console.log(response.data);
          commit("SET_USER_DATA", response.data);
          router.push({ name: "minesweeper" });
        })
        .catch(error => {
          //console.log("There was an error:", error.response); //
          Vue.$swal(
            "Oops! " + error.response.data.error,
            "Please enter correct email & password",
            "error"
          );
        });
    },
    login: ({ commit }, credentials) => {
      let router = credentials["router"];
      delete credentials["router"];
      EventService.login(credentials)
        .then(response => {
          commit("SET_USER_DATA", response.data);
          router.push({ name: "minesweeper" });
        })
        .catch(error => {
          Vue.$swal(
            //"Oops! " + error,
            "Oops! " + error.response.data.error,
            "Please enter correct email & password",
            "error"
          );
        });
    },
    logout: ({ commit }) => {
      commit("CLEAR_USER_DATA");
    }
  },
  getters: {
    gameTime: state => {
      return state.game.timer;
    },
    cell: state => (row, col) => {
      if (state.game.board.cells === null) return "";
      return state.game.board.cells[row][col];
    },
    loggedId: state => {
      return !!state.user;
    }
  }
});
