var heading = {
	template: `<div class="box heading" :data-uid="uid"><div>Head {{uid}}</div>
        <div class="btn-group">
            <button type="button" class="up" @click="up">up</button>
            <button type="button" class="down" @click="down">down</button>
            <button type="button" class="remove" @click="remove">remove</button>
        </div>
    </div>`,
	props: ["uid"],
	mounted() {
		console.log("mounted");
	},
	destroyed() {
		console.log("destroyed ");
	},
	methods: {
		remove(e) {
			this.$emit("remove", this.uid);
		},
		up(e) {
			this.$emit("up", this.uid);
		},
		down(e) {
			this.$emit("down", this.uid);
		}
	}
};

export default heading;
