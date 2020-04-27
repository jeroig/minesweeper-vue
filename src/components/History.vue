<template>
  <v-container>
    <div v-if="history">
      <Alert
        ref="alert"
        message="In this section you can see Games played and resume it if not finished yet."
      />
    </div>
    <div v-else>
      <v-row v-for="game in gamesPage" :key="game.id">
        <v-col>
          <v-card elevation hover shaped>
            <v-card-title>
              <v-icon v-if="game.status == 'winner'" large left color="success">
                mdi-check-circle
              </v-icon>
              <v-icon
                v-else-if="game.status == 'loser'"
                large
                left
                color="error"
              >
                mdi-close-circle
              </v-icon>
              <v-icon v-else large left color="teal">
                mdi-play-circle
              </v-icon>
              <span class="title font-weight-light"> {{ game.date }} </span>
            </v-card-title>
            <v-card-subtitle>
              {{ game.status }} - {{ game.duration }}
            </v-card-subtitle>
            <v-card-text> </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-center">
            <v-pagination
              v-model="pageNumber"
              :length="paginationLength"
              total-visible="5"
              circle
              color="success"
              light
            >
            </v-pagination>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import EventService from '@/services/EventService.js'
import Alert from '@/views/Alert.vue'
import EventBus from '@/components/EventBus.js'

export default {
  name: 'history',
  components: {
    Alert,
  },
  data() {
    return {
      pageNumber: 1,
      pageSize: 3,
      games: [],
    }
  },
  computed: {
    history() {
      return !this.games.length > 0
    },
    paginationLength() {
      return Math.ceil(this.games.length / this.pageSize)
    },
    gamesPage() {
      return this.games.slice(
        (this.pageNumber - 1) * this.pageSize,
        this.pageNumber * this.pageSize
      )
    },
  },
  methods: {
    getHistory() {
      EventService.historyGames()
        .then((response) => {
          //console.log(response.data)
          this.games = response.data
        })
        .catch((error) => {
          console.log('There was an error:', error.response) // Logs out the error
        })
    },
  },

  created() {
    EventBus.$on('refreshHistory', () => {
      this.getHistory()
    })
    this.getHistory()
  },
}
</script>
