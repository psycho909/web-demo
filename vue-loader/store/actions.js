var actions = {
	add: function (context, data) {
		context.commit("ADD_USER", data.user);
		context.commit({
			type: "ERROR",
			error: "",
		});
	},
	del: function (context, data) {
		context.commit("DEL_USER", data.index);
		context.commit({
			type: "ERROR",
			error: "",
		});
	},
	edit: function (context, data) {
		context.commit("EDIT_USER", data);
		context.commit({
			type: "ERROR",
			error: "",
		});
	},
	init: function (context, data) {
		context.commit({
			type: "LOADING",
			status: true,
		});
		axios
			.get("https://randomuser.me/api/?results=10")
			.then(function (res) {
				var data = res.data.results;
				context.commit("INIT_USER", data);
				context.commit({
					type: "LOADING",
					status: false,
				});
				context.commit({
					type: "ERROR",
					error: "",
				});
			})
			.catch(function (err) {
				context.commit({
					type: "ERROR",
					error: "AJAX 發生錯誤",
				});
				context.commit({
					type: "LOADING",
					status: false,
				});
			});
	},
};
