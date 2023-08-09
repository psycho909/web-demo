export function createStore(reducer, initialState) {
	let state = initialState;
	const listeners = [];

	const getState = () => state;

	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach((listener) => listener());
	};

	const subscribe = (listener) => {
		listeners.push(listener);
		return () => {
			const index = listeners.indexOf(listener);
			listeners.splice(index, 1);
		};
	};

	dispatch({}); // 初始化 state

	return { getState, dispatch, subscribe };
}
