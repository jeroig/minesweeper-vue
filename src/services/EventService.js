import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  //baseURL: "http://minesweeper-api.reservable.com.ar/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  newGame(rows, columns, mines) {
    return apiClient.get("/game/reset/" + rows + "/" + columns + "/" + mines);
  },
  setState(state, row, col) {
    return apiClient.get("/game/" + state + "/row/" + row + "/col/" + col);
  }
};
