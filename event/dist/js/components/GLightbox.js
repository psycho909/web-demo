let GLightbox = {
	props: {
		showLightbox: {
			type: Boolean,
			default: false,
		},
		style: {
			type: [String, Object],
		},
		action: {
			default: true,
		},
		close: {
			default: true,
		},
		className: {
			default: "",
		},
	},
	setup(props, { emit }) {
		// const emit = defineEmits(["update:showLightbox"])
		const lightboxRef = Vue.ref(null);
		const closeBtn = () => {
			emit("update:showLightbox", false);
		};
		Vue.onMounted(() => {
			console.log(123);
		});
		Vue.watchEffect(() => {
			if (props.showLightbox) {
				document.querySelector("body").classList.add("ov-hidden");
			} else {
				document.querySelector("body").classList.remove("ov-hidden");
			}
		});
		return {
			closeBtn,
		};
	},
	template: `
    <Teleport to="body">
        <div class="g-lightbox" :style="[style ? style : '']" :class="className" v-if="showLightbox">
            <div class="g-lightbox__module"></div>
            <div class="g-lightbox__wrap">
                <template v-if="close">
                    <slot name="lightbox-close">
                        <a href="javascript:;" class="g-lightbox__close icon-close" @click="closeBtn">close</a>
                    </slot>
                </template>
                <div class="g-lightbox__container">
                    <slot name="lightbox-title"></slot>
                    <div class="g-lightbox__content">
                        <slot name="lightbox-content"></slot>
                    </div>
                    <div class="g-lightbox__btn-group" v-if="action">
                        <slot name="lightbox-btn">
                            <a href="javascript:;" class="g-lightbox__btn" @click="closeBtn">確定</a>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
    `,
};

export default GLightbox;
