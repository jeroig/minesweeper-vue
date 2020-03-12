<template>
  <!--
  <div class="">
    <h1>Minesweeper ON-LINE!</h1>
    <Status />
    <Board />
  </div>
-->
  <v-container>
    <v-row>
      <v-col>
        <Status />
      </v-col>
      <v-col>
        <Board />
      </v-col>
      <v-col>
        "Lista de juegos previos"<br />
        "Botones de reinicio"<br />
        "etc..."<br />
      </v-col>
    </v-row>
  </v-container>
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
