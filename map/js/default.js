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

map = new _map("map", {
	x: default_area.lon === "" ? 120.239 : parseFloat(default_area.lon),
	y: default_area.lat === "" ? 22.992 : parseFloat(default_area.lat),
	zoom: default_area.zoom === "" ? 7 : parseInt(default_area.zoom),
	minZoom: is_login === true ? 7 : 8,
	maxBounds: [
		[28, 112],
		[20, 136]
	],
	tool: {
		zoom_in: "map_zoom_in",
		zoom_out: "map_zoom_out"
	}
});

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
