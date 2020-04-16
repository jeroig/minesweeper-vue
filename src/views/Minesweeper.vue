<template>
  <v-container>
    <v-row>
      <v-col>
        <Status />
      </v-col>
      <v-col>
        <v-container v-if="!gameId">
          <v-row>
            <v-col>
              <v-row align="center" justify="center">
                <v-alert
                  border="top"
                  colored-border
                  color="light-green darken-1"
                  elevation="5"
                  dense
                  icon="mdi-alert-circle-outline"
                >
                  In this section you can see the GameBoard once you start the
                  Game.
                </v-alert>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <Board />
      </v-col>
      <v-col>
        <History />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Board from '@/components/Board.vue'
import Status from '@/components/Status.vue'
import History from '@/components/History.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'minesweeper',
  components: {
    Board,
    Status,
    History
  },
  computed: {
    ...mapGetters(['gameId'])
  }
}
</script>
