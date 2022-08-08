var getters = {
	getIndex: (state) => (id) => {
		return state.content.body.findIndex((v, i) => v.uid == id);
	}
};

export default getters;
