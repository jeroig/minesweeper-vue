<template>
  <div>
    TODO - General data from the game like Time, Mines, etc..<br>
    Rows:  <input type="number" v-model:value="rows" /> <br>
    Columns:  <input type="number" v-model:value="columns" /> <br>
    Mines: <input type="number" v-model:value="mines" /> <br>
    <button @click="restart"> Restart </button>
    Timer: {{ $store.state.timer }}   <button @click="increment"> Add </button>
  </div>
</template>

<script>
export default  {
  data(){
    return {
      rows: this.$store.state.rows,
      columns: this.$store.state.columns,
      mines: this.$store.state.mines
    }
  },
  methods: {
    restart() {
      this.$store.dispatch('asyncRestart', {rows: this.rows, columns: this.columns, mines: this.mines})
      //this.$store.commit('restartGame', {rows: this.rows, columns: this.columns, mines: this.mines} );
    },
    increment() {
      //this.$store.commit('increment')
    }
  }
}
</script>
