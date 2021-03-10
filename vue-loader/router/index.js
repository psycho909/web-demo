var Home = httpVueLoader("./components/home.vue");
var about = httpVueLoader("./components/about.vue");
var vuex = httpVueLoader("./components/vuex.vue");

var routes = [
	{ path: "/", component: Home },
	{ path: "/about/:id", name: "about", component: about },
	{ path: "/vuex", component: vuex },
];

var router = new VueRouter({
	routes: routes,
});
router.beforeEach(function (to, from, next) {
	// console.log(to, from);
	next();
});
