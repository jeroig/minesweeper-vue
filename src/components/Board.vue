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
      return this.$store.state.rows
    },
    columns() {
      return this.$store.state.columns
    },
    mines() {
      return this.$store.state.mines
    },
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
      )
        document.getElementById("cell_" + key).click();
    }
  },
/*
  beforeMount: function() {
    fetch(
      "http://localhost:3000/api/game/reset/" +
        this.rows + "/" +
        this.columns + "/" +
        this.mines + ".json"
    )
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
  }
*/
};
</script>
