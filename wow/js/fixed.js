var fixed = {
	template: `<div class="box fixed" :style="position" :data-uid="content.uid">
        <div>Foo {{content.uid}} </div>
        
        <control :uid="content.uid"  />
        </div>`,
	props: ["content"],
	mounted() {
		console.log("mounted", this.content);
	},
	destroyed() {
		console.log("destroyed ");
	},
	updated() {
		console.log("updated");
	},
	computed: {
		position() {
			var top = this.content.top ? `top:0px;` : `bottom:0px;`;
			var left = this.content.left ? `left:0px;` : `right:0px;`;
			return top + left;
		}
	},
	methods: {}
};

export default fixed;
