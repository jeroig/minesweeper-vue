<template>
  <div style="text-align: center;">
    <button
      v-if="click & (value != -1)"
      class="myButton2"
      v-bind:style="{ color: activeColor }"
      disabled
    >
      {{ value }}
    </button>
    <button
      v-else-if="click & (value == -1)"
      class="myButton"
      v-bind:style="{ color: activeColor }"
    >
      <i class="fas fa-bomb"></i>
    </button>
    <button
      v-else-if="question"
      v-on:contextmenu.prevent="newState('mark')"
      class="myButton"
      v-bind:style="{ color: activeColor }"
    >
      <i class="fas fa-question"></i>
    </button>
    <button
      v-else-if="mark"
      v-on:contextmenu.prevent="newState('to_click')"
      class="myButton"
      v-bind:style="{ color: activeColor }"
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
    >
      &ensp;
    </button>
  </div>
</template>

<script>
export default {
  name: "Cell",
  props: ["row", "col"],
  data: function() {
    return {
      value: 0,
      question: false,
      mark: false,
      click: false
    };
  },
  computed: {
    id: function() {
      return "cell_" + this.row + "_" + this.col;
    },
    activeColor: function() {
      if (this.question) return "darkcyan";
      else if (this.mark) return "darkred";
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
    gameStatus: function(state) {
      if (state == 'winner'){
        this.$swal("YOU WIN THE GAME", "The game is over", "success")
      }
      else if (state == 'looser') {
        this.$swal("Game Over", "You find a mine so you loose the game", "error")
      }
      else {
        console.log('nothing to do!')
      }
    },
    updateNeighbours: function(key, values) {
      this.$emit("update-neighbours", key, values);
    },
    doClick: function() {
      var vm = this;
      fetch(
        "http://localhost:3000/api/game/click/row/" +
          this.row +
          "/col/" +
          this.col +
          ".json"
      )
        .then(response => {
          //console.log(response)
          return response.json();
        })
        .then(data => {
          console.log(data);
          vm.value = data.value.value;
          vm.click = data.value.click;
          vm.question = data.value.question;
          vm.mark = data.value.mark;
          var values = data.value;
          if (
            values.value == 0 &&
            values.question == false &&
            values.mark == false
          ) {
            // Hacemos click en todos los vecinos que no esten marcados o no sean bomba!
            for (var key in data.neighbors) {
              if (data.neighbors.hasOwnProperty(key)) {
                this.updateNeighbours(key, data.neighbors[key]);
              }
            }
          }
          this.gameStatus(data.state)
          return data;
        });
    },
    newState: function(newState) {
      var vm = this;
      fetch(
        "http://localhost:3000/api/game/" +
          newState +
          "/row/" +
          this.row +
          "/col/" +
          this.col +
          ".json"
      )
        .then(response => {
          //console.log(response)
          return response.json();
        })
        .then(data => {
          //console.log(data);
          vm.value = data.value.value;
          vm.click = data.value.click;
          vm.question = data.value.question;
          vm.mark = data.value.mark;
          this.gameStatus(data.state);
          return data;
        });
    }
  },
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
