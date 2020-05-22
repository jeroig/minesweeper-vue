<template>
  <v-container>
    <v-row v-if="!getInfo.state">
      <Alert
        ref="alert"
        message="In this section you can see the state of the game and the time played."
        color="light-green darken-1"
        icon="mdi-alert-circle-outline"
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
    <v-form v-model="isFormValid">
      <v-row>
        <v-col>
          <v-text-field
            type="number"
            v-model="rows"
            label="Rows"
            min="1"
            max="10"
            :rules="validLimits"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            type="number"
            v-model="columns"
            label="Columns"
            min="1"
            max="10"
            :rules="validLimits"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            type="number"
            v-model="mines"
            label="Mines"
            :rules="maxMinesRule"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col>
          <v-btn
            color="light-green darken-1"
            elevation="8"
            padless
            rounded
            class="my-2 white--text"
            @click="restart"
            :disabled="!isFormValid"
          >
            {{ btnValue }}
          </v-btn>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-form>
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
      mines: this.$store.state.game.board.mines,
      validLimits: [
        (value) => !!value || 'Value is required',
        (value) => value >= 1 || 'Minimum value is 1.',
        (value) => value <= 10 || 'Maximun value is 10.',
      ],
      isFormValid: false,
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['gameTime', 'gameState']),

    maxMines() {
      return this.rows == 0 || this.columns == 0
        ? 0
        : this.rows * this.columns - 1
    },
    maxMinesRule() {
      const rules = []
      rules.push((value) => !!value || 'Value is required')
      const dynamicRule = (value) =>
        value <= this.maxMines ||
        `A maximum of ${this.maxMines} mines is allowed`
      rules.push(dynamicRule)
      rules.push((value) => value >= 1 || 'At least 1 mine must be defined.')
      return rules
    },
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
          state: this.gameState,
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
          state: this.gameState,
        }
      } else {
        return {
          color: 'teal',
          icon: 'mdi-play-circle',
          state: this.gameState,
        }
      }
    },
  },
  methods: {
    validate() {
      this.isFormValid = this.$refs.form.validate()
    },
    infoCell: function (row, col) {
      return {
        value: this.$store.getters.cell(row, col).value,
        state: this.$store.getters.cell(row, col).state,
      }
    },
    restart() {
      this.$store.dispatch('asyncRestart', {
        rows: this.rows,
        columns: this.columns,
        mines: this.mines,
      })
      EventBus.$emit('refreshHistory')
    },
  },
  created() {
    //
  },
}
</script>
