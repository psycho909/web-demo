var card = {
	template: `<div class="box card" :data-uid="content.uid"><div>Card {{content.uid}}</div>
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
export default card;
