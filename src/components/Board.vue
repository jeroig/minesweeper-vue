<template>
  <div style="text-align: -webkit-center;">
    <table border="0" id="board">
      <tbody>
        <tr v-for="(row, i) in rows" :key="i">
          <td v-for="(col, j) in columns" :key="j">
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

export default {
  name: "board",
  /*
  data() {
    return {
      rows: this.$store.state.rows,
      columns: this.$store.state.columns,
      mines:  this.$store.state.mines,
    };
  },
  */
  computed: {
    rows() {
      return this.$store.state.rows;
    },
    columns() {
      return this.$store.state.columns;
    },
    mines() {
      return this.$store.state.mines;
    }
  },
  components: {
    Cell
  },
  methods: {
    clickAdjacentCell: function(key, values) {
      if (
        values.value >= 0 &&
        !values.question &&
        !values.mark &&
        !values.click &&
        document.getElementById("cell_" + key) != null
      ) {
        //this.$store.dispatch('asyncClickCell', {key: key})
        //console.log("------------------------");
        //console.log("CLICK CELDA: " + key);
        document.getElementById("cell_" + key).click();
        //console.log("------------------------");
      }
    }
  },
  beforeMount() {
    // Init the game
    this.$store.dispatch("asyncRestart", {
      rows: this.rows,
      columns: this.columns,
      mines: this.mines
    });
  }
};
</script>
