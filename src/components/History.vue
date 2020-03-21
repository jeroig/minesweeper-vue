<template>
  <v-container>
    <v-row v-for="game in games" :key="game.id">
      <v-col>
        <v-card elevation hover shaped>
          <v-card-title>
            <v-icon v-if="game.status == 'winner'" large left color="success">
              mdi-check-circle
            </v-icon>
            <v-icon
              v-else-if="game.status == 'looser'"
              large
              left
              color="error"
            >
              mdi-close-circle
            </v-icon>
            <v-icon v-else large left color="teal">
              mdi-play-circle
            </v-icon>
            <span class="title font-weight-light"> {{ game.date }} </span>
          </v-card-title>
          <v-card-subtitle>
            {{ game.status }} - {{ game.duration }}
          </v-card-subtitle>
          <v-card-text> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      games: [
        {
          id: 1,
          date: "19/03/2020",
          duration: "34 seg.",
          status: "winner",
          board: { row: 4, file: 4, mines: 1 }
        },
        {
          id: 2,
          date: "20/03/2020",
          duration: "5 seg.",
          status: "looser",
          board: { row: 4, file: 4, mines: 1 }
        },
        {
          id: 3,
          date: "21/03/2020",
          duration: "70 seg.",
          status: "playing",
          board: { row: 10, file: 10, mines: 5 }
        }
      ]
    };
  }
};
</script>
