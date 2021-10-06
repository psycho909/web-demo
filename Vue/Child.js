var Btn = {
	props: {
		fn: {
			type: Function,
		},
	},
	template: `
        <button @click="emitClick">按鈕</button>
    `,
	methods: {
		emitClick() {
			this.$emit("click", this.fn);
		},
	},
};
var Child2 = {
	template: `
        <div>
            <h2>Child2 {{anim}}</h2>
            <label for="dog">
                <input id="dog" type="radio" name="anim" value="dog" v-model="anim" />
            </label>
            <label for="cat">
                <input id="cat" type="radio" name="anim" value="cat" v-model="anim" />
            </label>
            <button @click="onEmit">Click</button>
        </div>
    `,
	data() {
		return {
			anim: "",
		};
	},
	watch: {
		anim(newVal) {
			this.onEmit(newVal);
		},
	},
	methods: {
		onEmit(data) {
			this.$emit("onemot", data);
		},
	},
};
var Child1 = {
	props: ["msg"],
	components: { Child2, Btn },
	data() {
		return {
			anim: "",
		};
	},
	template: `
        <div>
            <h2>Child1 {{anim}}</h2>
            <Child2 @onemot="handleClick"></Child2>
            <Btn @click="handleClick2"></Btn>
        </div>
    `,
	methods: {
		handleClick(data) {
			this.anim = data;
		},
		handleClick2(data) {
			console.log(131231);
		},
	},
};

export { Child1, Child2 };
