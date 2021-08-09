(function (exports) {
	var MS_IN_MINUTES = 60 * 1000;

	var formatTime = function (date) {
		return date.toISOString().replace(/-|:|\.\d+/g, "");
	};

	var calculateEndTime = function (event) {
		return event.end ? formatTime(event.end) : formatTime(new Date(event.start.getTime() + event.duration * MS_IN_MINUTES));
	};

	var calendarGenerators = {
		google: function (event) {
			var startTime = formatTime(event.start);
			var endTime = calculateEndTime(event);

			var href = encodeURI(["https://www.google.com/calendar/render", "?action=TEMPLATE", "&text=" + (event.title || ""), "&dates=" + (startTime || ""), "/" + (endTime || ""), "&details=" + (event.description || ""), "&sprop=&sprop=name:"].join(""));
			return href;
		},

		ics: function (event) {
			var startTime = formatTime(event.start);
			var endTime = calculateEndTime(event);

			var href = encodeURI("data:text/calendar;charset=utf8," + ["BEGIN:VCALENDAR", "PRODID:Calendar", "VERSION:2.0", "BEGIN:VEVENT", "CLASS:PUBLIC", "DESCRIPTION:" + (event.description || ""), "DTSTART:" + (startTime || ""), "DTEND:" + (endTime || ""), "SUMMARY:" + (event.title || ""), "TRANSP:TRANSPARENT", "BEGIN:VALARM", "ACTION:DISPLAY", "SUMMARY:" + (event.title || ""), "DESCRIPTION:" + (event.description || ""), "TRIGGER:-PT10M", "END:VALARM", "END:VEVENT", "END:VCALENDAR"].join("\n"));

			return href;
		},

		ical: function (event) {
			return this.ics(event);
		},

		outlook: function (event) {
			return this.ics(event);
		},
	};

	var generateCalendars = function (event) {
		return {
			google: calendarGenerators.google(event),
			ical: calendarGenerators.ical(event),
			ios: navigator.userAgent.match("CriOS") ? calendarGenerators.google(event) : calendarGenerators.ical(event),
			outlook: calendarGenerators.outlook(event),
		};
	};

	// Make sure we have the necessary event data, such as start time and event duration
	var validParams = function (params) {
		return params.data !== undefined && params.data.start !== undefined && (params.data.end !== undefined || params.data.duration !== undefined);
	};

	exports.createCalendar = function (params) {
		if (!validParams(params)) {
			console.log("Event details missing.");
			return;
		}

		return generateCalendars(params.data);
	};
})(this);

function calender(e) {
	return new this(e);
}

document.addEventListener("DOMContentLoaded", function () {
	var elementA = document.createElement("a");
	var userAgent = navigator.userAgent;
	elementA.className = "gama-calender";

	var targetScript = document.getElementById("gama-calender");
	var calenderData = {
		title: targetScript.getAttribute("title") || "",
		start: new Date(targetScript.getAttribute("start")) || "",
		end: new Date(targetScript.getAttribute("end")) || "",
		description: targetScript.getAttribute("description") || "",
	};

	var myCalendar = createCalendar({
		data: calenderData,
	});

	var calenderEvent = "";
	var device;
	if (userAgent.indexOf("Android") > -1) {
		calenderEvent = myCalendar.google;
		device = "android";
	}
	if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) {
		var _safari = userAgent.match("Safari");
		if (!_safari) {
			alert("IOS玩家使用Safari開啟頁面即可獲此提醒。");
			return;
		} else {
			calenderEvent = myCalendar.ical;
			device = "safari";
		}
	}
	device ? (elementA.href = calenderEvent) : (elementA.href = "javascript:;");
	document.getElementsByTagName("body")[0].insertAdjacentElement("beforeEnd", elementA);
	calender = {
		android: myCalendar.google,
		ios: myCalendar.ical,
		device: device,
	};
});
