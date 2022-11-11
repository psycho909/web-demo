(function () {
	window.addEventListener("DOMContentLoaded", function () {
		console.log("DOMContentLoaded");
	});
	if (document.readyState !== "loading") {
		console.log("document is already ready, just execute code here");
	} else {
		document.addEventListener("DOMContentLoaded", function () {
			console.log("document was not ready, place code here");
		});
	}
})();
