<template>
  <v-btn
    v-if="this.cell.state == 'clicked' && this.cell.value != -1"
    disabled
    rounded
  >
    <span v-bind:style="{ color: activeColor }">{{ cellNumber }}</span>
  </v-btn>
  <v-btn
    v-else-if="(this.cell.state == 'clicked') & (this.cell.value == -1)"
    disabled
    rounded
  >
    <v-icon v-bind:style="{ color: activeColor }">mdi-bomb</v-icon>
  </v-btn>
  <v-btn
    v-else-if="this.cell.state == 'disputed'"
    v-on:contextmenu.prevent="newState('mark')"
    v-bind:disabled="disabled"
    rounded
  >
    <v-icon :color="activeColor">mdi-help-circle-outline</v-icon>
  </v-btn>
  <v-btn
    v-else-if="this.cell.state == 'marked'"
    v-on:contextmenu.prevent="newState('to_click')"
    v-bind:disabled="disabled"
    rounded
  >
    <v-icon :color="activeColor">mdi-flag-variant</v-icon>
  </v-btn>
  <v-btn
    v-else
    v-on:click="doClick"
    v-on:contextmenu.prevent="newState('question')"
    v-bind:id="id"
    v-bind:disabled="disabled"
    rounded
  >
  </v-btn>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    row: {
      type: Number,
      required: true,
    },
    col: {
      type: Number,
      required: true,
    },
  },

  computed: {
    cellNumber() {
      return this.cell.value == 0 ? '' : this.cell.value
    },

    cell() {
      return this.$store.getters.cell(this.row, this.col)
    },
    id() {
      return this.row + '_' + this.col
    },

    disabled() {
      if (this.$store.state.game.state == 'playing') {
        return false
      } else {
        return true
      }
    },

    activeColor: function () {
      if (this.cell.state == 'disputed') return 'lime darken-2'
      else if (this.cell.state == 'marked') return 'red !important;'
      else
        switch (this.cell.value) {
          case -1:
            return 'black !important;'
          case 1:
            return 'blue'
          case 2:
            return 'green'
          case 3:
            return 'red'
          case 4:
            return 'purple'
          case 5:
            return 'darkgoldenrod'
          case 6:
            return 'royalblue'
          case 7:
            return 'seagreen'
          case 8:
            return 'mediumvioletred'
          default:
            return ''
        }
    },
  },

  methods: {
    updateNeighbor: function (tmp_cell) {
      this.$emit('update-neighbor', tmp_cell)
    },
    doClick: function () {
      this.$store.dispatch('asyncClickCell', this)
    },
    newState: function (newState) {
      this.$store.dispatch('asyncSetCellState', {
        row: this.cell.row,
        col: this.cell.col,
        newState: newState,
      })
    },
  },
}
</script>
