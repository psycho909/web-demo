var edit = () => {
	return Vue.component("edit", {
		template: `
            <div class="edit" v-if="showModel">
                <div class="edit-module"></div>
                <div class="edit-wrap">
                    <button type="button" class="edit-close" @click="close">close</button>
                    <div class="edit-content"><slot name="edit-content"></slot></div>
                </div>
            </div>
        `,
		model: {
			prop: "showModel",
			event: "close"
		},
		props: {
			showModel: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			console.log(this.showModel);
		},
		destroyed() {
			console.log("destroyed");
		},
		methods: {
			close() {
				this.$emit("close", false);
			}
		}
	});
};

export default edit;
