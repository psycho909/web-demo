var menuSlide = {
	template: `<div>
	<button type="button" class="add" v-for="m in menu" @click="add(m)">Add {{m}}</button>
	</div>`,
	props: ["menu"],
	methods: {
		add(cpt) {
			var data = {
				cpt
			};
			this.$store.commit("ADD", data);
		}
	}
};

export default menuSlide;
