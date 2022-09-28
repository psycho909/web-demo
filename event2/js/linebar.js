export default function (target, width) {
	document.querySelector(`${target} span`).style.setProperty("--width", width);
}
