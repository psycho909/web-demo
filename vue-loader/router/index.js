var routes = [
	{ path: "/", component: httpVueLoader("./components/home.vue") },
	{ path: "/about", component: httpVueLoader("./components/about.vue") },
	{ path: "/hello", component: httpVueLoader("./components/hello.vue") },
];

var router = new VueRouter({
	routes: routes,
});
router.beforeEach(function (to, from, next) {
	// console.log(to, from);
	next();
});
