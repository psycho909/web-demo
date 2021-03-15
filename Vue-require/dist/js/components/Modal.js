define(["vue", "text!./Modal.html"], function (Vue, Modal) {
	return {
		template: Modal,
		props: ["title"],
		methods: {
			close: function () {
				this.$emit("close");
			},
		},
	};
});
