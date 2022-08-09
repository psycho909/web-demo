import actions from "./actions.js";
import getters from "./getters.js";
import mutations from "./mutations.js";
import state from "./state.js";

var store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
});

export default store;
