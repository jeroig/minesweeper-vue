import axios from "axios";
//import Base64 from "crypto-js/enc-base64";
//import SHA3 from "crypto-js/sha3";
//import SHA256 from "crypto-js/sha256";

import sha256 from "crypto-js/sha256";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  //baseURL: "http://minesweeper-api.reservable.com.ar/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

function str_encrypt(password, key) {
  const hashDigest = sha256(password);
  return Base64.stringify(hmacSHA512(hashDigest, key));
}

export default {
  newGame(rows, columns, mines) {
    return apiClient.get("/game/reset/" + rows + "/" + columns + "/" + mines);
  },
  setState(state, row, col) {
    return apiClient.get("/game/" + state + "/row/" + row + "/col/" + col);
  },
  newUser(credentials) {
    return apiClient.post("/user/register", credentials);
  },
  login(credentials) {
    //console.log(str_encrypt(credentials.password,'login'));
    credentials.password = str_encrypt(credentials.password, "login");
    return apiClient.post("/user/login", credentials);
  }
};
