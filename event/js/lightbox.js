function Gallery(className, movie) {
	var defaultObj = {
		addClass: "default",
		hasCloseBtn: true,
		hasActionBtn: false,
		clickBgClose: true,
		afterClose: function () {
			$.gbox.close();
		},
	};
	defaultObj.addClass = `default ${className}`;
	if (movie) {
		movie = `./assets/css/video/${movie}.mp4`;
	}
	var HTML = `<div class="lb-content lb-pop">${movie ? '<video src="' + movie + '" muted autoplay playsinline loop></video>' : ""}</div>`;
	$.gbox.open(HTML, defaultObj);
}

$(".lb-btn").on("click", function () {
	let pop = $(this).attr("data-pop");
	let movie = $(this).attr("data-movie");
	Gallery(pop, movie);
});
