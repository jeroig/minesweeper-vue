<template>
  <div class="">
    <h1>Minesweeper ON-LINE!</h1>
    <Status />
    <Board />
  </div>
</template>

<script>
// @ is an alias to /src
import Board from "@/components/Board.vue";
import Status from "@/components/Status.vue";

export default {
  name: "minesweeper",
  components: {
    Board,
    Status
  }
};
</script>
