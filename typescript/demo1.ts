function Message<T, U>(value: T, message: U, name = "Chen"): T {
	console.log(message);
	return value;
}

Message("Hello", "World", "Word");

function SayHi(): void {
	console.log("SayHi");
}
