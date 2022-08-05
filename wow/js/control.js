var control = Vue.component("control", {
	props: ["uid"],
	template: `
    <div class="btn-group">
        <button type="button" class="up" @click="up">up</button>
        <button type="button" class="down" @click="down">down</button>
        <button type="button" class="remove" @click="remove">remove</button>
    </div>
    `,
	methods: {
		remove(e) {
			Bus.$emit("remove", this.uid);
		},
		up(e) {
			Bus.$emit("up", this.uid);
		},
		down(e) {
			Bus.$emit("todo", this.uid);
		}
	}
});

export default control;
