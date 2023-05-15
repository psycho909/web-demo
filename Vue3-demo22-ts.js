import { defineComponent, ref } from "https://unpkg.com/vue@3.2.8/dist/vue.esm-bundler.js";

export const MyCounter = defineComponent({
	setup() {
		const count = ref(0);
		const increment = () => {
			count.value++;
		};
		return {
			count,
			increment
		};
	},
	template: `
    <div>
      <p>Count: {{ count }}</p>
      <button @click="increment">Increment</button>
    </div>
  `
});

export const MyInput = defineComponent({
	props: {
		value: {
			type: String,
			required: true
		}
	},
	emits: {
		input: (value: string) => true
	},
	setup(props, { emit }) {
		const inputValue = ref(props.value);
		const onInput = (event: Event) => {
			const target = event.target as HTMLInputElement;
			inputValue.value = target.value;
			emit("input", inputValue.value);
		};
		return {
			inputValue,
			onInput
		};
	},
	template: `
    <div>
      <label>
        Input Value:
        <input type="text" :value="inputValue" @input="onInput">
      </label>
      <p>You entered: {{ inputValue }}</p>
    </div>
  `
});
