function append(s) {
	return new Promise((resolve, reject) => {
		let script = document.createElement("script");
		script.src = s;
		document.body.append(script);
		script.onload = function () {
			resolve("success");
		};
		script.onerror = function () {
			reject("unsuccessfule");
		};
	});

	// Hello();
}

append("./測試109-script1.js")
	.then((res) => {
		Hello();
		return append("./測試109-script2.js");
	})
	.then((res) => {
		Hello2();
	});
