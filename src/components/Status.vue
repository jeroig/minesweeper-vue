<template>
  <v-container>
    <v-row v-if="!getInfo.state">
      <Alert
        ref="alert"
        message="In this section you can see the state of the game and the time played."
      />
    </v-row>

    <v-row v-else>
      <v-col>
        <v-alert
          text
          dense
          :color="getInfo.color"
          :icon="getInfo.icon"
          border="left"
        >
          {{ getInfo.state }}
        </v-alert>
      </v-col>
      <v-col>
        <v-alert text dense color="teal" icon="mdi-clock-fast" border="left">
          {{ gameTime }} segs.
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          type="number"
          v-model="rows"
          label="Rows"
          min="1"
          max="10"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          type="number"
          v-model="columns"
          label="Columns"
          min="1"
          max="10"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          type="number"
          v-model="mines"
          label="Mines"
          min="1"
          max="99"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn
          dark
          color="light-green darken-1"
          elevation="8"
          padless
          rounded
          class="my-2"
          @click="restart"
        >
          {{ btnValue }}
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import Alert from '@/views/Alert.vue'
import { mapGetters } from 'vuex'
import EventBus from '@/components/EventBus.js'

export default {
  name: 'Status',
  components: { Alert },
  data() {
    return {
      rows: this.$store.state.game.board.rows,
      columns: this.$store.state.game.board.columns,
      mines: this.$store.state.game.board.mines
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['gameTime', 'gameState']),

    btnValue() {
      return this.gameState == 'playing' ? 'Restart' : 'Start'
    },
    getInfo() {
      if (this.gameState == 'winner') {
        this.$swal(
          'YOU WIN THE GAME in ' + this.gameTime + ' seg.',
          'The game is over',
          'success'
        )
        return {
          color: 'success',
          icon: 'mdi-check-circle',
          state: this.gameState
        }
      } else if (this.gameState == 'loser') {
        this.$swal(
          'Game Over',
          'You click a mine so you loose the game',
          'error'
        )
        return {
          color: 'error',
          icon: 'mdi-close-circle',
          state: this.gameState
        }
      } else {
        return {
          color: 'teal',
          icon: 'mdi-play-circle',
          state: this.gameState
        }
      }
    }
  },
  methods: {
    infoCell: function(row, col) {
      return {
        value: this.$store.getters.cell(row, col).value,
        state: this.$store.getters.cell(row, col).state
      }
    },
    restart() {
      this.$store.dispatch('asyncRestart', {
        rows: this.rows,
        columns: this.columns,
        mines: this.mines
      })
      EventBus.$emit('refreshHistory')
    }
  },
  created() {
    //
  }
}
</script>
