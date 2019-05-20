<template>
  <div>
    TODO - General data from the game like Time, Mines, etc..<br />
    Rows: <input type="number" v-model="rows" /> <br />
    Columns: <input type="number" v-model="columns" /> <br />
    Mines: <input type="number" v-model="mines" /> <br />
    <button @click="restart">Restart</button>
    Timer: {{ timer }} segs. <br>
    Estado: <b> {{ state }} </b> <br>
  </div>
</template>

<script>

export default {
  data() {
    return {
      rows: this.$store.state.game.board.rows,
      columns: this.$store.state.game.board.columns,
      mines: this.$store.state.game.board.mines
    };
  },
  computed: {
    state: function() {
      if (this.$store.state.game.state == "winner") {
        this.$swal("YOU WIN THE GAME in " + this.timer + " seg.", "The game is over", "success");
      } else if (this.$store.state.game.state == "looser") {
        this.$swal(
          "Game Over",
          "You find a mine so you loose the game",
          "error"
        );
      } else {
        //console.log('nothing to do!')
      }
      return this.$store.state.game.state
    },
    timer() {
      return this.$store.state.game.timer
    }
  },
  methods: {
    restart() {
      this.$store.dispatch("asyncRestart", {
        rows: this.rows,
        columns: this.columns,
        mines: this.mines
      });
      //this.$store.commit('restartGame', {rows: this.rows, columns: this.columns, mines: this.mines} );
    }
  },
  created() {
    this.$store.commit("beginTimer")
  }
};
</script>
