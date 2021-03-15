var Home = {
	template: `
        <div>
            <h2>Home</h2>
            <div>{{this.$store.state.name}} {{name}}</div>
        </div>
    `,
	data: function () {
		return {
			name: "Chen",
		};
	},
	components: {
		// About: About,
	},
	beforeRouteEnter: function (to, from, next) {
		console.log(to, from);
		next();
	},
};
