require.config({
	baseUrl: "./js",
	shim: {
		vue: {
			exports: "vue",
		},
	},
	paths: {
		vue: "./vue.min",
		vuex: "https://unpkg.com/vuex",
		jquery: "./jquery-3.1.1.min",
		text: "./text",
		json: "./json",
	},
});

require(["jquery", "vue", "components/Home", "components/Modal", "components/Home2", "components/ListView"], function ($, Vue, Home, Modal, Home2, ListView) {
	new Vue({
		el: "#app",
		mounted: function () {
			this.$refs.loading.className = "show";
		},
		components: {
			Home: Home,
			Modal: Modal,
			Home2: Home2,
			ListView: ListView,
		},
		data: {
			msg: "Hello World",
			isShow: false,
			title: "",
		},
		methods: {
			showModal: function (data) {
				var isShow = data.isShow;
				var title = data.title;
				this.isShow = isShow;
				this.title = title;
			},
			close: function () {
				this.isShow = false;
			},
		},
	});
});
