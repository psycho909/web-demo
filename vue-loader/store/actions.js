var actions = {
	add: function (context, data) {
		context.commit("ADD_USER", data.user);
	},
	del: function (context, data) {
		context.commit("DEL_USER", data.index);
	},
	edit: function (context, data) {
		context.commit("EDIT_USER", data);
	},
};
