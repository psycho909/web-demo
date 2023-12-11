// class AA {
// 	constructor() {
// 		this.name = "AA";
// 		this.data = null;
// 		this.getData(this.handleData.bind(this));
// 	}

// 	getData(callback) {
// 		var xhr = new XMLHttpRequest();
// 		xhr.open("GET", "https://reqres.in/api/products/3", true);
// 		xhr.onload = function () {
// 			if (xhr.status === 200) {
// 				callback(xhr.responseText);
// 			} else {
// 				console.error("Request failed with status:", xhr.status);
// 				callback(null);
// 			}
// 		};
// 		xhr.onerror = function () {
// 			console.error("Request failed");
// 			callback(null);
// 		};
// 		xhr.send();
// 	}

// 	handleData(response) {
// 		this.data = response;
// 		// Do something with this.data if needed
// 	}

// 	getName() {
// 		return this.name;
// 	}
// }

// var aa = new AA();

(function (exports) {
	var a = 1;
	exports.b = function () {
		console.log(a);
	};
	console.log(321);
})(this);
