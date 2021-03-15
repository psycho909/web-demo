define(["vue", "text!./ListView.html"], function (Vue, ListView) {
	return {
		template: ListView,
		data: function () {
			return {
				isShow: false,
				title: "ListView",
			};
		},
		methods: {
			setModal: function () {
				this.isShow = !this.isShow;
				this.$emit("set_modal", this.isShow, this.title);
			},
		},
	};
});
