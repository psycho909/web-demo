Vue.use(Vuex);

var store = new Vuex.Store({
	state: {
		member: [],
		count: 0,
	},
	getters: {
		result: function (state) {
			return state.member.length;
		},
		member: function (state) {
			return state.member;
		},
	},
	mutations: {
		ADD_USER: function (state, payload) {
			state.member.push(payload);
		},
		DEL_USER: function (state, payload) {
			state.member.splice(payload, 1);
		},
		EDIT_USER: function (state, payload) {
			Vue.set(state.member, payload.index, payload.user);
		},
	},
	actions: actions,
});
