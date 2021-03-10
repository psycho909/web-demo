var store = new Vuex.Store({
	state: {
		member: [],
		count: 0,
		loading: false,
		error: "",
	},
	getters: {
		result: function (state) {
			return state.member.length;
		},
		member: function (state) {
			return state.member;
		},
	},
	mutations: mutations,
	actions: actions,
});
