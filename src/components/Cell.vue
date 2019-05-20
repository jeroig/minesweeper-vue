<template>
  <div style="text-align: center;">
    <button
      v-if="state == 'clicked' && (value != -1)"
      class="myButton2"
      v-bind:style="{ color: activeColor }"
      v-bind:restart="restart"
      disabled
    >
      {{ value }}
    </button>
    <button
      v-else-if="state == 'clicked' & (value == -1)"
      class="myButton"
      v-bind:style="{ color: activeColor }"
      v-bind:restart="restart"
    >
      <i class="fas fa-bomb"></i>
    </button>
    <button
      v-else-if="state == 'disputed'"
      v-on:contextmenu.prevent="newState('mark')"
      class="myButton"
      v-bind:style="{ color: activeColor }"
      v-bind:restart="restart"
    >
      <i class="fas fa-question"></i>
    </button>
    <button
      v-else-if="state == 'marked'"
      v-on:contextmenu.prevent="newState('to_click')"
      class="myButton"
      v-bind:style="{ color: activeColor }"
      v-bind:restart="restart"
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
    >
      &ensp;
    </button>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

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

  data: function() {
    return {
      value: 0,
      state: 'unclicked'
    };
  },

  computed: {
    restart: function() {
      this.value = 0;
      this.state = 'unclicked';
      this.$store.state.restart;
    },
    id: function() {
      return "cell_" + this.row + "_" + this.col;
    },
    activeColor: function() {
      if (this.state == 'disputed') return "darkcyan";
      else if (this.state == 'marked') return "darkred";
      else
        switch (this.value) {
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

    updateNeighbours: function(cell) {
      this.$emit("update-neighbours", cell);
    },
    doClick: function() {
      var vm = this;
      EventService.setState("click", this.row, this.col).then(response => {
        var data = response.data;
        vm.value = data.cell.value;
        vm.state = data.cell.state;
        if (
          data.cell.value == 0 &&
          data.cell.state != 'questioned' &&
          data.cell.state != 'marked'
        ) {
          // Hacemos click en todos los vecinos que no esten marcados o no sean bomba!
          data.neighbors.map(cell => {
            vm.updateNeighbours(cell);
          });
        }
        //vm.gameStatus(data.state);
        vm.$store.dispatch("asyncGameState", data.state );
        return data;
      });
    },
    newState: function(newState) {
      var vm = this;
      EventService.setState(newState, this.row, this.col).then(response => {
        //console.log(response.data)
        vm.value = response.data.cell.value;
        vm.state = response.data.cell.state;
        //this.gameStatus(response.data.state);
        this.$store.dispatch("asyncGameState", response.data.state )
        return response.data;
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
