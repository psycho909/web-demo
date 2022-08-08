var foo = {
	template: `<div class="box foo"><div>Foo</div>
			<control :uid="content.uid">
				<template #btn-update>
					<button type="button" class="update" @click="update">update</button>
				</template>
			</control>
			<edit v-model="showEdit">
				<template #edit-content>
					<p>213123</p>
					<p>213123</p>
					<p>213123</p>
					<p>213123</p>
					<p>213123</p>
					<p>213123</p>
					<button type="button" class="submit" @click="submit">確定</button>
				</template>
			</edit>
		</div>`,
	props: ["content"],
	data() {
		return {
			showEdit: false
		};
	},
	mounted() {
		var _uid = this.$store.state.content.body.findIndex((v, i) => v.uid == this.content.uid);
		if (!this.$store.state.content.body[_uid].update) {
			this.showEdit = true;
		}
		console.log("mounted", this.showEdit);
	},
	updated() {
		console.log("updated", this.showEdit);
	},
	destroyed() {
		console.log("destroyed ");
	},
	methods: {
		update() {
			this.showEdit = true;
		},
		submit() {
			var data = {
				uid: this.content.uid,
				content: {}
			};
			this.$store.commit("UPDATE", data);
			this.showEdit = false;
		}
	}
};

export default foo;
