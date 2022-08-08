var control = () => {
	Vue.component("control", {
		props: ["uid"],
		template: `
		<div class="btn-group">
			<button type="button" class="up" @click="up">up</button>
			<button type="button" class="down" @click="down">down</button>
			<button type="button" class="remove" @click="remove">remove</button>
			<slot name="btn-update"></slot>
		</div>
		`,
		methods: {
			remove() {
				this.$store.commit("REMOVE", this.uid);
			},
			up() {
				this.$store.commit("UP", this.uid);
			},
			down() {
				this.$store.commit("DOWN", this.uid);
			}
		}
	});
};

export default control;
