define(["vue", "text!./About.html"], function (Vue, About) {
	return {
		template: About,
		props: ["about"],
		data: function () {
			return {
				addr: "ADDRR",
			};
		},
		methods: {
			getAddr: function () {
				this.$emit("getaddr", this.addr);
			},
		},
	};
});
