var pMap;
var MapOptions;
// 初始化地圖
function InitWnd() {
	var pOMap = document.getElementById("TGMap");
	pMap = new TGOS.TGOnlineMap(pOMap, TGOS.TGCoordSys.EPSG3826); //宣告TGOnlineMap地圖物件並設定坐標系統
	MapOptions = {
		backgroundColor: "#CCCCCC", //backgroundColor(設定地圖背景顏色)
		disableDefaultUI: true, //disableDefaultUI(是否關閉所有地圖物件)
		scrollwheel: true, //scrollwheel(是否允許使用者使用滑鼠滾輪縮放地圖)
		mapTypeControl: false, //mapTypeControl(是否開啟地圖類型控制項)
		mapTypeControlOptions: {
			//mapTypeControlOptions(指定提供的地圖類型)
			mapTypeIds: [TGOS.TGMapTypeId.ROADMAP, TGOS.TGMapTypeId.F2IMAGE],
			//mapTypeId(設定地圖控制項中欲顯示之底圖圖磚類型按鈕
			//上行範例只提供福衛混和地圖及福衛二號衛星影像兩類)
			//若不設定則預設顯示所有類型的底圖圖磚按鈕供使用者切換
			controlPosition: TGOS.TGControlPosition.RIGHT_TOP,
			//controlPosition(設定地圖類型控制項在地圖的位置)
			mapTypeControlStyle: TGOS.TGMapTypeControlStyle.DEFAULT
			//mapTypeControlstyle(設定地圖類型控制項樣式)
			//(可設定參數有：DEFAULT / HORIZONTAL_BAR / DROPDOWN_MENU)
		},
		navigationControl: false, //navigationControl(是否開啟縮放控制列)
		navigationControlOptions: {
			//navigationControlOptions(提供指定縮放控制列)
			controlPosition: TGOS.TGControlPosition.RIGHT_TOP,
			//controlPosition(設定縮放控制列在地圖的位置)
			navigationControlStyle: TGOS.TGNavigationControlStyle.SMALL
			//navigationControlStyle(設定縮放控制列樣式)
			//(可設定參數有：完整版 / 縮小版(DEFAULT / SMALL))
		},
		scaleControl: false, //scaleControl(是否開啟比例尺控制項)
		scaleControlOptions: {
			//scaleControlOptions(提供指定比例尺控制項)
			controlPosition: TGOS.TGControlPosition.LEFT_BOTTOM
			// controlPosition (設定比例尺控制項在地圖的位置)
		},
		draggable: true, //draggable(設定地圖是否可被拖曳)
		keyboardShortcuts: true //keyboardShortcuts(設定是否可用鍵盤控制地圖)
	};
	pMap.setOptions(MapOptions);
	pMap.setZoom(7); //指定地圖層級
}
function get_Envelope() {
	alert(pMap.getBounds()); //取出地圖的邊框Envelope物件
}
function set_Envelope() {
	var fixleft = Number(document.getElementById("fixleft").value);
	var fixtop = Number(document.getElementById("fixtop").value);
	var fixright = Number(document.getElementById("fixright").value);
	var fixbottom = Number(document.getElementById("fixbottom").value);
	pMap.fitBounds(new TGOS.TGEnvelope(fixleft, fixtop, fixright, fixbottom));
	//傳入Envelope物件以設定地圖的邊框範圍
	pMap.setZoom(4); //指定地圖層級
}
function MoveMap() {
	var X = Number(document.getElementById("txt_X").value);
	var Y = Number(document.getElementById("txt_Y").value);
	pMap.panBy(X, Y); //輸入坐標x,y，以此點做為平移基準，可對地圖進行平移
}
window.addEventListener("wheel", function (e) {
	console.log(pMap.getZoom());
});
// $("#draggable").draggable();
