import axios from 'axios'
import sha256 from 'crypto-js/sha256'
import hmacSHA512 from 'crypto-js/hmac-sha512'
import Base64 from 'crypto-js/enc-base64'

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  //baseURL: 'http://192.168.88.11:3000/api',
  //baseURL: "http://minesweeper-api.reservable.com.ar/api",
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

function str_encrypt(password, key) {
  const hashDigest = sha256(password)
  return Base64.stringify(hmacSHA512(hashDigest, key))
}

export default {
  newGame(rows, columns, mines) {
    return apiClient.get('/game/reset/' + rows + '/' + columns + '/' + mines)
  },
  setState(gameId, state, row, col) {
    return apiClient.get(
      '/game/' + gameId + '/' + state + '/row/' + row + '/col/' + col
    )
  },
  newUser(credentials) {
    credentials.password = str_encrypt(credentials.password, 'userCredentials')
    return apiClient.post('/user/register', credentials)
  },
  login(credentials) {
    //console.log(str_encrypt(credentials.password,'login'));
    credentials.password = str_encrypt(credentials.password, 'userCredentials')
    return apiClient.post('/user/login', credentials)
  },
  setHeaderCommon(token) {
    apiClient.defaults.headers.common['Authorization'] = token
      ? `Bearer ${token}`
      : null
  },
  historyGames() {
    return apiClient.get('/game/history')
  }
}
