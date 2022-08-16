var foo = {
	template: `<div class="box foo"><div>{{content.content.text}}</div>
		<button type="button" class="btn" @click="test">測試</button>
			<control :uid="content.uid">
				<template #btn-update>
					<button type="button" class="update" @click="update">update</button>
				</template>
			</control>
			<edit v-model="showEdit">
				<template #edit-content>
					<input type="text" v-model="text" />
					<button type="button" class="submit" @click="submit">確定</button>
				</template>
			</edit>
		</div>`,
	props: ["content"],
	data() {
		return {
			showEdit: false,
			text: ""
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
		test() {
			this.$store.dispatch("test");
		},
		update() {
			this.showEdit = true;
		},
		submit() {
			var data = {
				uid: this.content.uid,
				content: {
					text: this.text
				}
			};
			this.$store.commit("UPDATE", data);
			this.showEdit = false;
		}
	}
};

export default foo;
