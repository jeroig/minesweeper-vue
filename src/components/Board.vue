<template>
  <div style="text-align: -webkit-center;">
    <table border="0" id="board">
      <tbody>
        <tr v-for="(row, i) in board.rows" :key="i">
          <td v-for="(col, j) in board.columns" :key="j">
            <cell
              v-bind:row="i"
              v-bind:col="j"
              @update-neighbours="clickAdjacentCell"
            >
            </cell>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import Cell from "@/components/Cell.vue";
import { mapState } from 'vuex';

export default {
  name: "board",

  computed: mapState({
      board: state => state.game.board
  }),

  components: {
    Cell
  },
  methods: {
    clickAdjacentCell: function(cell) {
      var key = "cell_" + cell.row + "_" + cell.col;
      if (
        cell.value >= 0 &&
        cell.state == 'unclicked'  &&
        document.getElementById(key) != null
      ) {
        //this.$store.dispatch('asyncClickCell', {key: key})
        //console.log("------------------------");
        //console.log("CLICK CELDA: " + key);
        document.getElementById(key).click();
        //console.log("------------------------");
      }
    }
  },
  created() {
    // Init the game
    this.$store.dispatch("asyncRestart", {
      rows: this.board.rows,
      columns: this.board.columns,
      mines: this.board.mines
    });
  }
};
</script>
