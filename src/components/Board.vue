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
//import { stateBoard } from "@/vuex/helpers.js";

export default {
  name: "board",

  computed: {
    componentsList() {
      return this.$refs.cells.length;
    },
    ...mapState({ board: state => state.game.board })
    //...stateBoard
  },

  components: {
    Cell
  },

  methods: {
    getId(row, col) {
      return row + "_" + col;
    },

    getCellComponent(row, col) {
      var tmp_id = row + "_" + col;
      // Return Cell as component
      return this.$refs.cells.find(cell => cell.id === tmp_id);
    },

    clickAdjacentCell: function(cell) {
      var cell_component = this.getCellComponent(cell.row, cell.col);
      this.$store.dispatch("asyncClickCell", cell_component);
      /*
      if (cell_component === undefined){
        console.log("No pudo obtener el componente " + cell.row + "_" + cell.col)
      }
      else{
        //var cell_store     = cell_component.cell
        this.$store.dispatch('asyncClickCell', cell_component)
      }
      */
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
