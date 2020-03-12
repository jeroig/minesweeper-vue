<template>
  <v-container>
    <v-row>
      <v-col>
        <v-alert text dense color="teal" icon="mdi-play-circle" border="left">
          {{ state }}
        </v-alert>
      </v-col>
      <v-col>
        <v-alert text dense color="teal" icon="mdi-clock-fast" border="left">
          {{ gameTime }} segs.
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field type="number" v-model="rows" label="Rows"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          type="number"
          v-model="columns"
          label="Columns"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          type="number"
          v-model="mines"
          label="Mines"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn
          dark
          color="light-green darken-1"
          elevation="8"
          padless
          rounded
          class="my-2"
          @click="restart"
        >
          Restart
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <!--
    Celdat:
    <b>
      {{ infoCell(0,0) }} | {{ infoCell(0,1) }}  | {{ infoCell(0,2) }} | {{ infoCell(0,3) }}  <br />
      {{ infoCell(1,0) }} | {{ infoCell(1,1) }}  | {{ infoCell(1,2) }} | {{ infoCell(1,3) }} <br />
      {{ infoCell(2,0) }} | {{ infoCell(2,1) }}  | {{ infoCell(2,2) }} | {{ infoCell(2,3) }} <br />
      {{ infoCell(3,0) }} | {{ infoCell(3,1) }}  | {{ infoCell(3,2) }} | {{ infoCell(3,3) }} <br />
    </b>
    -->
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      rows: this.$store.state.game.board.rows,
      columns: this.$store.state.game.board.columns,
      mines: this.$store.state.game.board.mines
    };
  },
  computed: {
    state: function() {
      if (this.$store.state.game.state == "winner") {
        this.$swal(
          "YOU WIN THE GAME in " + this.gameTime + " seg.",
          "The game is over",
          "success"
        );
      } else if (this.$store.state.game.state == "looser") {
        this.$swal(
          "Game Over",
          "You find a mine so you loose the game",
          "error"
        );
      } else {
        //console.log('nothing to do!')
      }
      return this.$store.state.game.state;
    },
    gameTime() {
      return this.$store.getters.gameTime;
    }
  },
  methods: {
    infoCell: function(row, col) {
      return {
        value: this.$store.getters.getCell(row, col).value,
        state: this.$store.getters.getCell(row, col).state
      };
    },
    restart() {
      this.$store.dispatch("asyncRestart", {
        rows: this.rows,
        columns: this.columns,
        mines: this.mines
      });
    }
  },
  created() {
    //
  }
};
</script>
