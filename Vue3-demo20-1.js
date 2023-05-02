var child1Component = {
	async setup(props, { emit }) {
		const res = await axios.get("https://reqres.in/api/users?delay=3");
		const post = await res.data;
		const handleChange = () => {
			emit("change", "child2");
			// await new Promise(resolve => setTimeout(resolve, 50))
			// throw new Error('Oops!')
		};
		return {
			post,
			handleChange
		};
	},
	template: `
		<div>Child</div>
		<button @click="handleChange">change</button>
		<div>{{post}}</div>
	`
};
export default child1Component;
