const store = new Vuex.createStore({
	state: {
		message: "",
		login: false,
	},
	mutations: {
		toggleLogin(state) {
			state.login = !state.login;
		},
		setMessage(state, text) {
			state.setMessage = text;
		},
	},
});

export default store;
