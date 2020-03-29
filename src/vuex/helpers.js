import { mapGetters } from "vuex";
//import { mapState } from "vuex";

export const authComputed = {
  ...mapGetters(["loggedIn"])
};

//export const stateBoard = {
//  ...mapState({ board: state => state.game.board })
//};
