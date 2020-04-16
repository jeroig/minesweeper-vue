<template>
  <v-container>
    <v-row v-for="game in gamesPage" :key="game.id">
      <v-col>
        <v-card elevation hover shaped>
          <v-card-title>
            <v-icon v-if="game.status == 'winner'" large left color="success">
              mdi-check-circle
            </v-icon>
            <v-icon v-else-if="game.status == 'loser'" large left color="error">
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
  </v-container>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
  data() {
    return {
      pageNumber: 1,
      pageSize: 3,
      games: [
        {
          id: 1,
          date: '19/03/2020',
          duration: '34 seg.',
          status: 'winner',
          board: { row: 4, file: 4, mines: 1 }
        },
        {
          id: 2,
          date: '20/03/2020',
          duration: '5 seg.',
          status: 'loser',
          board: { row: 4, file: 4, mines: 1 }
        },
        {
          id: 3,
          date: '21/03/2020',
          duration: '70 seg.',
          status: 'playing',
          board: { row: 10, file: 10, mines: 5 }
        },
        {
          id: 4,
          date: '22/03/2020',
          duration: '70 seg.',
          status: 'playing',
          board: { row: 10, file: 10, mines: 5 }
        },
        {
          id: 5,
          date: '23/03/2020',
          duration: '70 seg.',
          status: 'playing',
          board: { row: 10, file: 10, mines: 5 }
        },
        {
          id: 6,
          date: '24/03/2020',
          duration: '70 seg.',
          status: 'playing',
          board: { row: 10, file: 10, mines: 5 }
        },
        {
          id: 7,
          date: '25/03/2020',
          duration: '70 seg.',
          status: 'playing',
          board: { row: 10, file: 10, mines: 5 }
        },
        {
          id: 8,
          date: '26/03/2020',
          duration: '70 seg.',
          status: 'playing',
          board: { row: 10, file: 10, mines: 5 }
        }
      ]
    }
  },
  computed: {
    paginationLength() {
      return Math.ceil(this.games.length / this.pageSize)
    },
    gamesPage() {
      return this.games.slice(
        (this.pageNumber - 1) * this.pageSize,
        this.pageNumber * this.pageSize
      )
    }
  },
  created() {
    /*
    EventService.historyGames()
      .then(response => {
        //console.log(response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response) // Logs out the error
      })
    */
  }
}
</script>
