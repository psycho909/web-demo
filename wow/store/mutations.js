var mutations = {
	ADD(state, data) {
		var uid = Math.floor(Math.random() * 100);
		state.content.body.push({ component: data.cpt, uid, content: {} });
	},
	REMOVE(state, data) {
		var _index = state.content.body.findIndex((v, i) => v.uid == data);
		if (_index > -1) {
			state.content.body = [...state.content.body.slice(0, _index), ...state.content.body.slice(_index + 1)];
		}
	},
	UPDATE(state, data) {
		var _index = state.content.body.findIndex((v, i) => v.uid == data.uid);
		Vue.set(state.content.body[_index], "content", data.content);
		Vue.set(state.content.body[_index], "update", true);
	},
	UP(state, data) {
		var _index = state.content.body.findIndex((v, i) => v.uid == data);
		if (_index - 1 < 0) {
			return;
		}
		var _temp = state.content.body[_index];
		var _content = [...state.content.body.slice(0, _index), ...state.content.body.slice(_index + 1)];
		state.content.body = _content;
		state.content.body.splice(_index - 1, 0, _temp);
	},
	DOWN(state, data) {
		var _index = state.content.body.findIndex((v, i) => v.uid == data);
		if (_index + 1 >= state.content.body.length) {
			return;
		}
		var _temp = state.content.body[_index];
		var _content = [...state.content.body.slice(0, _index), ...state.content.body.slice(_index + 1)];
		state.content.body = _content;
		state.content.body.splice(_index + 1, 0, _temp);
	}
};

export default mutations;
