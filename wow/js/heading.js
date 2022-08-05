var heading = {
	template: `<div class="box heading" :data-uid="content.uid">
	<div>Head {{content.uid}}</div>
	<control :uid="content.uid"  />
    </div>`,
	props: ["content"],
	mounted() {
		console.log("mounted");
	},
	destroyed() {
		console.log("destroyed ");
	},
	methods: {}
};

export default heading;
