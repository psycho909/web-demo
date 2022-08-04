var fixed = {
	template: `<div class="box fixed" :style="position" :data-uid="uid">
        <div>Foo {{uid}} {{top}} {{left}}</div>
        
        <div class="btn-group">
            <button type="button" class="up" @click="up">up</button>
            <button type="button" class="down" @click="down">down</button>
            <button type="button" class="remove" @click="remove">remove</button>
        </div>
        </div>`,
	props: ["uid", "top", "left"],
	mounted() {
		console.log("mounted", this.top);
	},
	destroyed() {
		console.log("destroyed ");
	},
	updated() {
		console.log("updated", this.top);
	},
	computed: {
		position() {
			var top = this.top ? `top:0px;` : `bottom:0px;`;
			var left = this.left ? `left:0px;` : `right:0px;`;
			return top + left;
		}
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

export default fixed;
