<template>
  <v-container>
    <v-row elevation v-for="(game, index) in games">
      <v-col>
         <v-card >
           <v-card-title>
            <v-icon large left color="success">
              mdi-check-circle
            </v-icon>
            <span class="title font-weight-light"> {{game.date}}</span>
          </v-card-title>
          <v-card-subtitle>
            {{ game.status}} - {{ game.duration}}
          </v-card-subtitle>
          <v-card-text>
          </v-card-text>
         </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
         <v-card>
           <v-card-title>
            <v-icon large left color="error">
              mdi-stop-circle

            </v-icon>
            <span class="title font-weight-light">1</span>
          </v-card-title>
         </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
         <v-card>
           <v-card-title>
            <v-icon large left color="teal">
              mdi-play-circle

            </v-icon>
            <span class="title font-weight-light">1</span>
          </v-card-title>
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
        {id: 1, date: '19/03/2020', duration: '34 seg.', status: 'Winner', board: {row: 4, file: 4, mines: 1}},
        {id: 2, date: '20/03/2020', duration: '5 seg.', status: 'Looser', board: {row: 4, file: 4, mines: 1}},
        {id: 3, date: '21/03/2020', duration: '70 seg.', status: 'Playing', board: {row: 10, file: 10, mines: 5}}
      ]
    };
  },
}

</script>
