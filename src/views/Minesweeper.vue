<template>
  <v-container>
    <v-row>
      <v-col>
        <Status />
      </v-col>
      <v-col>
        <v-container v-if="!gameId">
          <Alert
            ref="alert"
            message="In this section you can see the GameBoard once you start the
                  Game."
          />
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
import Alert from '@/views/Alert.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'minesweeper',
  components: {
    Board,
    Status,
    History,
    Alert
  },
  computed: {
    ...mapGetters(['gameId'])
  },
  methods: {}
}
</script>
