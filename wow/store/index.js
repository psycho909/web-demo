import getter from "./getter.js";
import mutations from "./mutations.js";
import state from "./state.js";

var store = new Vuex.Store({
	state,
	getter,
	mutations
});

export default store;
