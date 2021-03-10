Vue.use(httpVueLoader);
Vue.component("loading", httpVueLoader("./components/loading.vue"));

var vm = new Vue({
	el: "#app",
	router: router,
	store: store,
	components: {
		top: "url:./components/top.vue",
	},
	data: function () {
		return {};
	},
});
