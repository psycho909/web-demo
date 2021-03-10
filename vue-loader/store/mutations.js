var mutations = {
	ADD_USER: function (state, payload) {
		// state.member.push(payload);
		state.member = [...state.member, payload];
	},
	DEL_USER: function (state, payload) {
		// state.member.splice(payload, 1);
		state.member = state.member.filter(function (v, i) {
			return i != payload;
		});
	},
	EDIT_USER: function (state, payload) {
		Vue.set(state.member, payload.index, payload.user);
	},
	INIT_USER: function (state, payload) {
		state.member = [...state.member, ...payload];
	},
	LOADING: function (state, payload) {
		if (payload.status) {
			state.loading = true;
		} else {
			state.loading = false;
		}
	},
	ERROR: function (state, payload) {
		state.error = payload.error;
	},
};
