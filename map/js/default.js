//地理位置查詢(google)
var defalut_bound = new google.maps.LatLngBounds(new google.maps.LatLng(20, 118), new google.maps.LatLng(24, 124));

var input_loc_addr = document.getElementById("input_loc_addr");
var searchBox = new google.maps.places.SearchBox(input_loc_addr, {
	bounds: defalut_bound,
	zIndex: 9999
});
var _map = function (container, opt) {
	var self = this;
	var base_layer = new Array();
	var _map = null;

	var _opt = {
		x: undefined,
		y: undefined,
		tool: {
			zoom_in: undefined,
			zoom_out: undefined
		}
	};
	$.extend(_opt, opt);

	var _use_whenready = _opt.x && _opt.y ? true : false;

	//底圖
	var set_base_layer = function () {
		base_layer.push({
			layer: new L.TileLayer("https://wmts.nlsc.gov.tw/wmts/EMAP5/default/GoogleMapsCompatible/{z}/{y}/{x}", { minZoom: 3, maxZoom: 19 }),
			name: _t("街道圖")
		});
		base_layer.push({
			layer: new L.TileLayer("https://wmts.nlsc.gov.tw/wmts/EMAP01/default/GoogleMapsCompatible/{z}/{y}/{x}", { minZoom: 3, maxZoom: 19 }),
			name: _t("電子地圖")
		});
		base_layer.push({
			layer: new L.TileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { minZoom: 3, maxZoom: 17, opacity: 1, zIndex: 5 }),
			name: _t("衛星影像")
		});
		base_layer.push({
			layer: new L.TileLayer("https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}", { minZoom: 3, maxZoom: 19 }),
			name: _t("正射影像")
		});

		/*
        var layer_tgos = new L.tileLayer.tgos("https://api.tgos.tw/TileAgent/{Layer_ID}.aspx/GetCacheImage?APPID={APPID}&APIKEY={APPKEY}&S={z}&X={x}&Y={y}&L=0",
            {
                minZoom: 1, maxZoom: 17, tgosMaxZoom: 20, zoomReverse: true, zoomOffset: -1, tms: false,
                Layer_ID: "TGOSMAP_W",
                APPID: tgos_APPID,
                APPKEY: tgos_APPKEY
            });
        base_layer.push(layer_tgos);
        */
	};

	//priate =====================================

	//public object =================================
	this.tool = null;

	this.goto_location = function (callback) {
		// 瀏覽器支援 HTML5 定位方法
		if (navigator.geolocation) {
			// HTML5 定位抓取
			navigator.geolocation.getCurrentPosition(
				function (p) {
					pos_x = p.coords.longitude;
					pos_y = p.coords.latitude;
					if (callback) {
						callback(pos_x, pos_y);
					}
				},
				function (error) {
					//alert("您目前不允許存取您的位置");
				}
			);
		} else {
			// HTML5 定位
		}
	};

	this.goto = function (x, y, zoom) {
		function sv() {
			self.get_map().setView([y, x], 12 || zoom);
		}
		if (_use_whenready) self.get_map().whenReady(sv);
		else sv();
	};

	this.fit = function (lng1, lng2, lat1, lat2) {
		function fb() {
			self.get_map().fitBounds([
				[lat1, lng1],
				[lat2, lng2]
			]);
		}
		if (_use_whenready) self.get_map().whenReady(fb);
		else fb();
	};

	//public function  ===============================

	/**
	 * 切換地圖
	 * @param {Int} index 底圖索引
	 */
	this.change_base_layer = function (index) {
		$(".base-layer .layer").removeClass("active");
		$($(".base-layer .layer").get(index)).addClass("active").blur();

		try {
			for (var i = 0; i < base_layer.length; i++) {
				if (i === index) {
					base_layer[i].layer.addTo(_map);
					$("#current_layer_name").text(base_layer[i].name);
					if (typeof log_action === "function") log_action("map", base_layer[i].name);
				} else {
					base_layer[i].layer.remove();
				}
			}
			if (index === 0) {
				$(".watermarker").css("color", "#000").css("opacity", "0.35");
			} else {
				$(".watermarker").css("color", "#fff").css("opacity", "0.1");
			}
		} catch (ex) {
			var e = ex;
			//console.error("change_base_layer fail");
			//console.log(ex);
		}
	};

	this.get_map = function () {
		return _map;
	};

	//二點距離(傳回公尺)
	this.distance = function (lon1, lat1, lon2, lat2) {
		var R = 6378.39; // km (change this constant to get miles)
		var dLat = ((lat2 - lat1) * Math.PI) / 180;
		var dLon = ((lon2 - lon1) * Math.PI) / 180;
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;
		return d * 1000;
	};

	//init =======================================

	//初始化
	var hide_timer = null;
	var init = function () {
		var map_opt = {
			center: [_opt.y, _opt.x],
			zoomControl: false,
			attributionControl: false,
			preferCanvas: true
		};

		$.extend(map_opt, _opt);
		console.log(container, map_opt);
		_map = L.map(container, map_opt);

		//換底圖
		set_base_layer();
		self.change_base_layer(2);

		//new pan
		$(_map.createPane("marker2")).addClass("leaflet-marker2-pane");

		//map tool init
		if (_map_tool) {
			this.tool = new _map_tool(_map, _opt.tool);
		}

		$(".base-layer .layer").each(function (index, elm) {
			$(elm).click(function () {
				self.change_base_layer(index);
			});
			$(elm).focus(function () {
				if (hide_timer && hide_timer !== null) window.clearTimeout(hide_timer);
				$("#current_layer_name").addClass("show");
			});
			$(elm).blur(function () {
				if (hide_timer && hide_timer !== null) window.clearTimeout(hide_timer);
				hide_timer = window.setTimeout(function () {
					$("#current_layer_name").removeClass("show");
				}, 500);
			});
		});

		$("#current_layer_name").focus(function () {
			if (hide_timer && hide_timer !== null) window.clearTimeout(hide_timer);
			$("#current_layer_name").addClass("show");
		});
		$("#current_layer_name").blur(function () {
			if (hide_timer && hide_timer !== null) window.clearTimeout(hide_timer);
			hide_timer = window.setTimeout(function () {
				$("#current_layer_name").removeClass("show");
			}, 500);
		});

		L.control
			.scale({
				maxWidth: 150,
				position: "bottomleft"
			})
			.addTo(_map);
	};

	init();

	return self;
};

var default_area = {};
var is_login = false;

// map = new _map("map", {
// 	x: default_area.lon === "" ? 120.239 : parseFloat(default_area.lon),
// 	y: default_area.lat === "" ? 22.992 : parseFloat(default_area.lat),
// 	zoom: default_area.zoom === "" ? 7 : parseInt(default_area.zoom),
// 	minZoom: is_login === true ? 7 : 8,
// 	maxBounds: [
// 		[28, 112],
// 		[20, 136]
// 	],
// 	tool: {
// 		zoom_in: "map_zoom_in",
// 		zoom_out: "map_zoom_out"
// 	}
// });

searchBox.addListener("places_changed", function () {
	var places = searchBox.getPlaces();
	if (places.length === 0) {
		return;
	}
	var lat = places[0].geometry.location.lat();
	var lng = places[0].geometry.location.lng();
	map.goto(lng, lat);
	set_center_marker(lng, lat);

	//log
	log_action("place", "addr", $("#input_loc_addr").val());
});
var map;
var location_center_maker = null;
var base_layer = [];
var set_base_layer = function () {
	base_layer.push({
		layer: L.tileLayer("https://wmts.nlsc.gov.tw/wmts/EMAP5/default/GoogleMapsCompatible/{z}/{y}/{x}", { minZoom: 3, maxZoom: 19 }),
		name: "街道圖"
	});
	base_layer.push({
		layer: L.tileLayer("https://wmts.nlsc.gov.tw/wmts/EMAP01/default/GoogleMapsCompatible/{z}/{y}/{x}", { minZoom: 3, maxZoom: 19 }),
		name: "電子地圖"
	});
	base_layer.push({
		layer: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { minZoom: 3, maxZoom: 17, opacity: 1, zIndex: 5 }),
		name: "衛星影像"
	});
	base_layer.push({
		layer: L.tileLayer("https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}", { minZoom: 3, maxZoom: 19 }),
		name: "正射影像"
	});
};
var change_base_layer = function (index) {
	for (var i = 0; i < base_layer.length; i++) {
		if (i == index) {
			base_layer[index].layer.addTo(map);
		} else {
			base_layer[i].layer.remove();
		}
	}
};

var example = [
	{ y: 25.077789, x: 121.5712388 },
	{ y: 25.077119, x: 121.5722328 },
	{ y: 25.077249, x: 121.5712358 },
	{ y: 25.077739, x: 121.5712318 },
	{ y: 25.077189, x: 121.5712358 },
	{ y: 25.077209, x: 121.5712388 }
];
function set_center_marker(y, x) {
	if (location_center_maker === null) {
		var html = '<div class="border"><div class="circle"></div></div>';
		var icon = L.divIcon({ className: "location-icon", html: html });

		example.forEach(function (p) {
			location_center_maker = L.marker([p.y, p.x], {
				icon: icon,
				pane: "marker2"
			});
			location_center_maker.addTo(map);
		});
	}
}
set_base_layer();
navigator.geolocation.getCurrentPosition(function (p) {
	var pos_y = p.coords.latitude;
	var pos_x = p.coords.longitude;
	map = L.map("map", {
		center: [pos_y, pos_x],
		zoom: 18
	});
	map.createPane("marker2");
	change_base_layer(0);
	set_center_marker(pos_y, pos_x);
});

var web_layer = {
	wind: {
		layer: null,
		load: false
	},
	pm25_country: {
		//國家監測網
		layer: null,
		load: false
	},
	pm25_gov: {
		//智慧城鄉空品物聯網(政府單位)
		layer: null,
		load: false
	},
	pm25_company: {
		//智慧社區空品點(民間企業)
		layer: null,
		load: false
	},
	//感測器資料
	device_point: {
		national: { layer: null },
		government: { layer: null },
		nongovernmental: { layer: null },
		school: { layer: null }
	},
	report_focus: {
		layer: null
	},
	pblh: {
		layer: null,
		load: false
	},
	PRTR: {
		//列管污染源-空氣污染
		layer: null,
		load: false
	},
	CEMS: {
		//CEMS
		layer: null,
		load: false
	},
	wind_marker: {
		//(環保署)風標
		layer: null,
		load: false
	},
	wind_marker_emct: {
		//(氣象局)風標
		layer: null,
		load: false
	},
	wind_marker_station: {
		//(地方測站)風標
		layer: null,
		load: false
	},
	fire: {
		//火點
		layer: null,
		load: false
	},
	case: {
		//陳情資料
		layer: null,
		load: false
	},
	firefighting: {
		// 火災通報資訊
		layer: null,
		load: false
	},
	potential: {
		//潛勢分析
		layer: null,
		load: false
	},
	pm25_fusion: {
		//融合數據
		layer: null,
		load: false
	},
	error_stat_count: {
		//污染源/感測管理
		pophigh: null,
		conhigh: null,
		con: null,
		neg: null,
		elow: null,
		ehigh: null
	},
	gpu: {
		pm25: null,
		o3: null,
		co: null,
		aqi: null,
		no2: null,
		pm10: null,
		so2: null
	},
	traffic: {
		car: null,
		highway: null
	},
	csv: {
		layer1: null,
		layer2: null,
		layer3: null,
		layer4: null,
		layer5: null,
		layer6: null,
		layer7: null,
		layer8: null,
		layer9: null,
		layer10: null,
		layer11: null
	},
	//VOC資料
	voc_point: {
		national: { layer: null },
		government: { layer: null },
		nongovernmental: { layer: null }
	},
	//人口密度
	people: {
		//人口密度
		layer: null,
		load: false
	}
};
web_layer.wind.layer.setColorScale(["#f00"]);

//載入風圖層
function load_wind_layer(start, end) {
	var color = get_wind_color();
	web_layer.wind = {
		layer: new _wind_layer(layer_root + "get_json", map.get_map(), start, end, {
			colorScale: [color],
			lazy_load: true
		}),
		load: false
	};

	$(web_layer.wind.layer)
		.on("layer_load", function (event, date, layer, success) {
			var bar = layer_bar.map;
			var index = bar.get_layer_index(web_layer.wind.layer);
			var load = get_hour_percent(date, start, end);
			bar.set_load(index, load);
		})
		.on("load", function () {
			web_layer.wind.load = true;
			timeline.active();
			var date = timeline.get_time();
			//web_layer.wind.layer.show_layer(date, true, false);
			console.log("load wind done");
		});

	$(timeline).on("value_changed", function (e, date) {
		if (web_layer.wind !== null) {
			var bar = layer_bar.map;
			var index = bar.get_layer_index(web_layer.wind.layer);
			var show = bar.get_show(index);
			web_layer.wind.layer.show_layer(date, null, show === false);
		}
	});

	//add auto load
	auto_load.add(web_layer.wind.layer, "H");
}
//載入環保署(風標)
function load_wind_maker(start, end) {
	web_layer.wind_marker = {
		layer: new _wind_marker_layer(layer_root, map.get_map(), start, end, {
			lazy_load: true,
			size: [
				{ min: 4, max: 7, size: 12 },
				{ min: 8, max: 10, size: 16 },
				{ min: 11, max: 13, size: 24 },
				{ min: 14, max: 18, size: 32 }
			]
		}),
		load: false
	};

	$(web_layer.wind_marker.layer)
		.on("load_data", function (sender, percent) {
			var bar = layer_bar.map;
			var index = bar.get_layer_index(web_layer.wind_marker.layer);
			bar.set_load(index, percent);
		})
		.on("load", function () {
			web_layer.wind_marker.layer.change_layer(timeline.get_time());
			var bar = layer_bar.map;
			var index = bar.get_layer_index(web_layer.wind_marker.layer);
			bar.set_load(index, 100);
		});

	$(timeline).on("value_changed", function (e, date) {
		if (web_layer.wind_marker.layer !== null) {
			web_layer.wind_marker.layer.change_layer(date);
		}
	});

	auto_load.add(web_layer.wind_marker.layer, "M");
}
//載入氣象局(風標)
function load_wind_maker_emct(start, end) {
	web_layer.wind_marker_emct = {
		layer: new _wind_marker_emct_layer(layer_root, map.get_map(), start, end, {
			lazy_load: true,
			size: [
				{ min: 4, max: 7, size: 12 },
				{ min: 8, max: 10, size: 16 },
				{ min: 11, max: 13, size: 24 },
				{ min: 14, max: 18, size: 32 }
			]
		}),
		load: false
	};

	$(web_layer.wind_marker_emct.layer)
		.on("load_data", function (sender, percent) {
			var bar = layer_bar.map;
			var index = bar.get_layer_index(web_layer.wind_marker_emct.layer);
			bar.set_load(index, percent);
		})
		.on("load", function () {
			web_layer.wind_marker.layer.change_layer(timeline.get_time());
			var bar = layer_bar.map;
			var index = bar.get_layer_index(web_layer.wind_marker_emct.layer);
			bar.set_load(index, 100);
		});

	$(timeline).on("value_changed", function (e, date) {
		if (web_layer.wind_marker_emct.layer !== null) {
			web_layer.wind_marker_emct.layer.change_layer(date);
		}
	});

	auto_load.add(web_layer.wind_marker_emct.layer, "H");
}
//載入地方測站(風標)
function load_wind_maker_station(start, end) {
	web_layer.wind_marker_station = {
		layer: new _wind_marker_station_layer(layer_root, map.get_map(), start, end, {
			lazy_load: true,
			size: [
				{ min: 4, max: 7, size: 12 },
				{ min: 8, max: 10, size: 16 },
				{ min: 11, max: 13, size: 24 },
				{ min: 14, max: 18, size: 32 }
			]
		}),
		load: false
	};

	$(web_layer.wind_marker_station.layer)
		.on("load_data", function (sender, percent) {
			var bar = layer_bar.map;
			var index = bar.get_layer_index(web_layer.wind_marker_station.layer);
			bar.set_load(index, percent);
		})
		.on("load", function () {
			web_layer.wind_marker.layer.change_layer(timeline.get_time());
			var bar = layer_bar.map;
			var index = bar.get_layer_index(web_layer.wind_marker_station.layer);
			bar.set_load(index, 100);
		});

	$(timeline).on("value_changed", function (e, date) {
		if (web_layer.wind_marker_station.layer !== null) {
			web_layer.wind_marker_station.layer.change_layer(date);
		}
	});

	auto_load.add(web_layer.wind_marker_station.layer, "H");
}
function set_wind_layer(start, end) {
	var img_root = "./images/";
	//set layer
	load_wind_layer(start, end);
	//風標圖層
	load_wind_maker(start, end);
	load_wind_maker_emct(start, end);
	load_wind_maker_station(start, end);

	layer_bar.map = new _map_layer(map, "map_layer", {
		mulit_select: true,
		title: "環境風場",
		collect: true,
		layers: [
			{
				icon: img_root + "icon/wind.png",
				text: "WRF風場模擬-簡寫",
				tooltip: "WRF風場模擬",
				type: "object",
				layer: web_layer.wind.layer,
				addToMap: function () {
					var date = timeline.get_time();
					web_layer.wind.layer.show_layer(date, null, false);
					web_layer.wind.layer.addToMap();
				},
				removeFromMap: function () {
					web_layer.wind.layer.removeFromMap();
				},
				show: false,
				active: true,
				load: 0
			},
			{
				icon: img_root + "icon/wind_bag_W.png",
				text: "環保署測站(風標)-簡寫",
				tooltip: "環保署測站(風標)",
				type: "object",
				layer: web_layer.wind_marker.layer,
				addToMap: function () {
					web_layer.wind_marker.layer.change_layer(timeline.get_time());
					web_layer.wind_marker.layer.addToMap();
				},
				removeFromMap: function () {
					web_layer.wind_marker.layer.removeFromMap();
				},
				show: false,
				active: true,
				load: 0
			},
			{
				icon: img_root + "icon/wind_bag_W.png",
				text: "氣象局測站(風標)-簡寫",
				tooltip: "氣象局測站(風標)",
				type: "object",
				layer: web_layer.wind_marker_emct.layer,
				addToMap: function () {
					web_layer.wind_marker_emct.layer.change_layer(timeline.get_time());
					web_layer.wind_marker_emct.layer.addToMap();
				},
				removeFromMap: function () {
					web_layer.wind_marker_emct.layer.removeFromMap();
				},
				show: false,
				active: true,
				load: 0
			},
			{
				icon: img_root + "icon/wind_bag_W.png",
				text: "地方測站(風標)",
				type: "object",
				layer: web_layer.wind_marker_station.layer,
				addToMap: function () {
					web_layer.wind_marker_station.layer.change_layer(timeline.get_time());
					web_layer.wind_marker_station.layer.addToMap();
				},
				removeFromMap: function () {
					web_layer.wind_marker_station.layer.removeFromMap();
				},
				show: false,
				active: true,
				load: 0
			}
		]
	});
}
