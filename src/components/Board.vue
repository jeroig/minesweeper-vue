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
  data() {
    return {
      state: "playing",
      columns: 5,
      rows: 7
    };
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

  beforeMount: function() {
    fetch("http://localhost:3000/api/game/reset.json")
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }
};
</script>
