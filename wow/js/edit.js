var edit = () => {
	return Vue.component("edit", {
		template: `
            <div class="edit" v-if="basedOn">
                <div class="edit-module"></div>
                <div class="edit-wrap">
                    <button type="button" class="edit-close" @click="close">close</button>
                    <div class="edit-content"><slot name="edit-content"></slot></div>
                </div>
            </div>
        `,
		model: {
			prop: "basedOn",
			event: "close"
		},
		props: {
			basedOn: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			console.log(this.basedOn);
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
