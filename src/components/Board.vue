<template>
  <div style="text-align: -webkit-center;">
    <table border="0" id="board">
      <tbody>
        <tr v-for="(row, i) in board.rows" :key="i">
          <td v-for="(col, j) in board.columns" :key="j">
            <cell
              :key="getId(i, j)"
              ref="cells"
              v-bind:row="i"
              v-bind:col="j"
              @update-neighbor="clickAdjacentCell"
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
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "board",

  computed: {
    ...mapState({ board: state => state.game.board }),
    ...mapGetters(["getCell"])
  },

  components: {
    Cell
  },

  methods: {
    getId(row, col) {
      return row + "_" + col;
    },

    getCellComponent(row, col) {
      return this.$refs.cells.find(cell => cell.id === this.getId(row, col));
    },

    clickAdjacentCell: function(cell) {
      let cell_component = this.getCellComponent(cell.row, cell.col);
      cell_component.doClick();
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
