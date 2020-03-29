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
    setUserData(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      EventService.setHeaderCommon(userData.token);
    },
    restartGame(state, data) {
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

    setGameOver(state, newState) {
      state.game.state = newState;
    },

    setCellState(state, data) {
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
          commit("restartGame", response.data);
        })
        .catch(error => {
          console.log("There was an error:", error.response); // Logs out the error
        });
    },
    asyncGameState: ({ commit }, newValue) => {
      if (newValue == "looser" || newValue == "winner") {
        commit("setGameOver", newValue);
      }
    },
    asyncSetCellState: ({ commit }, values) => {
      EventService.setState(values.newState, values.row, values.col)
        .then(response => {
          //console.log(response.data.cell)
          commit("setCellState", {
            row: response.data.cell.row,
            col: response.data.cell.col,
            newState: response.data.cell.state,
            value: response.data.cell.value
          });
          if (
            response.data.state == "looser" ||
            response.data.state == "winner"
          ) {
            commit("setGameOver", response.data.state);
          }
        })
        .catch(error => {
          console.log("There was an error asyncSetCellState:", error.response);
        });
    },
    asyncClickCell: ({ commit }, cell) => {
      EventService.setState("click", cell.row, cell.col)
        .then(response => {
          //console.log(response.data)
          if (response.data.was_clicked == false) {
            commit("setCellState", {
              row: response.data.cell.row,
              col: response.data.cell.col,
              newState: response.data.cell.state,
              value: response.data.cell.value
            });
            if (
              response.data.state == "looser" ||
              response.data.state == "winner"
            ) {
              commit("setGameOver", response.data.state);
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
          commit("setUserData", response.data);
          router.push({ name: "minesweeper" });
        })
        .catch(error => {
          //console.log("There was an error:", error.response); //
          Vue.$swal(
            "Oops! " + error,
            //"Oops! " + error.response.data.errors,
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
          //console.log(response.data);
          commit("setUserData", response.data);
          router.push({ name: "minesweeper" });
        })
        .catch(error => {
          //console.log("There was an error: ", error); // Logs out the error
          return Vue.$swal(
            "Oops! " + error,
            //"Oops! " + error.response.data.errors,
            "Please enter correct email & password",
            "error"
          );
        });
    }
  },

  getters: {
    gameTime: state => {
      return state.game.timer;
    },
    getCell: state => (row, col) => {
      if (state.game.board.cells === null) return "";
      return state.game.board.cells[row][col];
    },
    loggedId(state) {
      return !!state.user;
    }
  }
});
