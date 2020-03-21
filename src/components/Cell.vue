<template>
  <div style="text-align: center;">
    <button
      v-if="this.cell.state == 'clicked' && this.cell.value != -1"
      class="myButton2"
      v-bind:style="{ color: activeColor }"
      v-bind:restart="restart"
      disabled
    >
      {{ this.cell.value }}
    </button>
    <button
      v-else-if="(this.cell.state == 'clicked') & (this.cell.value == -1)"
      class="myButton"
      v-bind:style="{ color: activeColor }"
      v-bind:restart="restart"
      disabled
    >
      <i class="fas fa-bomb"></i>
    </button>
    <button
      v-else-if="this.cell.state == 'disputed'"
      v-on:contextmenu.prevent="newState('mark')"
      class="myButton"
      v-bind:style="{ color: activeColor }"
      v-bind:restart="restart"
      v-bind:disabled="disabled"
    >
      <i class="fas fa-question"></i>
      <!--
      <v-icon color="success">
        mdi-help-outline
      </v-icon>
      -->
    </button>
    <button
      v-else-if="this.cell.state == 'marked'"
      v-on:contextmenu.prevent="newState('to_click')"
      class="myButton"
      v-bind:style="{ color: activeColor }"
      v-bind:restart="restart"
      v-bind:disabled="disabled"
    >
      <i class="fas fa-flag"></i>
    </button>
    <button
      v-else
      v-on:click="doClick"
      v-on:contextmenu.prevent="newState('question')"
      v-bind:id="id"
      class="myButton"
      v-bind:style="{ color: activeColor }"
      v-bind:restart="restart"
      v-bind:disabled="disabled"
    >
      &ensp;
    </button>
  </div>
</template>

<script>
export default {
  name: "Cell",
  //props: ["row", "col"],
  props: {
    row: {
      type: Number,
      required: true
    },
    col: {
      type: Number,
      required: true
    }
  },

  /*
  data: function() {
    return {
      value: 0,
      state: "unclicked"
    };
  },
  */

  computed: {
    cell() {
      return this.$store.getters.getCell(this.row, this.col);
    },

    restart: function() {
      return this.$store.state.restart;
    },

    id: function() {
      return this.row + "_" + this.col;
    },

    disabled() {
      if (this.$store.state.game.state == "playing") {
        return false;
      } else {
        return true;
      }
    },

    activeColor: function() {
      if (this.cell.state == "disputed") return "darkcyan";
      else if (this.cell.state == "marked") return "darkred";
      else
        switch (this.cell.value) {
          case -1:
            return "black";
          case 1:
            return "blue";
          case 2:
            return "green";
          case 3:
            return "red";
          case 4:
            return "purple";
          default:
            return "";
        }
    }
  },

  methods: {
    updateNeighbor: function(tmp_cell) {
      this.$emit("update-neighbor", tmp_cell);
    },
    doClick: function() {
      this.$store.dispatch("asyncClickCell", this);
    },
    newState: function(newState) {
      this.$store.dispatch("asyncSetCellState", {
        row: this.cell.row,
        col: this.cell.col,
        newState: newState
      });
    }
  }
};
</script>

<style>
.myButton {
  -moz-box-shadow: inset 0px 1px 0px 0px #ffffff;
  -webkit-box-shadow: inset 0px 1px 0px 0px #ffffff;
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0.05, #ffffff),
    color-stop(1, #f6f6f6)
  );
  background: -moz-linear-gradient(top, #ffffff 5%, #f6f6f6 100%);
  background: -webkit-linear-gradient(top, #ffffff 5%, #f6f6f6 100%);
  background: -o-linear-gradient(top, #ffffff 5%, #f6f6f6 100%);
  background: -ms-linear-gradient(top, #ffffff 5%, #f6f6f6 100%);
  background: linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#f6f6f6',GradientType=0);
  background-color: #ffffff;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  display: inline-block;
  cursor: pointer;
  color: #666666;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;
}
.myButton:hover {
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0.05, #f6f6f6),
    color-stop(1, #ffffff)
  );
  background: -moz-linear-gradient(top, #f6f6f6 5%, #ffffff 100%);
  background: -webkit-linear-gradient(top, #f6f6f6 5%, #ffffff 100%);
  background: -o-linear-gradient(top, #f6f6f6 5%, #ffffff 100%);
  background: -ms-linear-gradient(top, #f6f6f6 5%, #ffffff 100%);
  background: linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f6f6f6', endColorstr='#ffffff',GradientType=0);
  background-color: #f6f6f6;
}
.myButton:active {
  position: relative;
  top: 1px;
}

.myButton2 {
  -moz-box-shadow: inset 0px 1px 0px 0px #ffffff;
  -webkit-box-shadow: inset 0px 1px 0px 0px #ffffff;
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background-color: transparent;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  display: inline-block;
  cursor: pointer;
  color: #777777;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;
}
</style>
