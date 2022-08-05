var foo = {
	template: `<div class="box foo"><div>Foo</div>
			<control :uid="content.uid"  />
		</div>`,
	props: ["content"],
	mounted() {
		console.log("mounted");
	},
	destroyed() {
		console.log("destroyed ");
	},
	methods: {
		// remove(e) {
		// 	this.$emit("remove", this.uid);
		// },
		// up(e) {
		// 	this.$emit("up", this.uid);
		// },
		// down(e) {
		// 	this.$emit("down", this.uid);
		// }
	}
};

export default foo;
