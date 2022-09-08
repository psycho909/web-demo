<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="Lineage_Event_GCP.Event.E20220914.Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<!-- <meta name="viewport" content="width=750,user-scalable=0"> -->
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<meta name="description" content="小小夥伴給你大大驚喜" />
		<!-- 除了H5活動頁以外都要加上 -->
		<meta name="open-default-browser" content="true" />

		<!-- fb meta -->
		<meta property="og:type" content="website" />
		<meta property="og:title" content="《天堂》天堂帕CASE！ " />
		<meta property="og:description" content="小小夥伴給你大大驚喜" />
		<!-- Safari 數字過常會變成可撥打電話 -->
		<meta name="format-detection" content="telephone=no" />
		<!-- 1200x628 -->
		<meta property="og:image" content="{{ url }}/assets/img/og-image.jpg" />

		<title>《天堂》天堂帕CASE！</title>
		<!-- CSS -->
		<link href="https://tw.hicdn.beanfun.com/plugins/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="./assets/css/default.css" />

		<!-- JS -->
		<!-- jQuery -->
		<script src="https://tw.hicdn.beanfun.com/plugins/isMobile/isMobile.min.js"></script>
		<script src="https://tw.hicdn.beanfun.com/jquery/jquery.min.js"></script>
		<script src="https://tw.hicdn.beanfun.com/jquery/jquery-migrate.min.js"></script>
		<script src="https://tw.hicdn.beanfun.com/beanfun/GamaWWW/allProducts/script/gbox/gbox.js"></script>
		<script type="text/javascript" src="https://tw.hicdn.beanfun.com/plugins/loadingProgress/loadingProgress.js"></script>
		<script src="https://tw.hicdn.beanfun.com/plugins/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js"></script>
		<script src="https://tw.hicdn.beanfun.com/plugins/vuex/3.1.1/vuex.min.js"></script>
		<script src="https://tw.hicdn.beanfun.com/plugins/vue/2.6.10/vue.js"></script>
		<!-- <script src="https://tw.hicdn.beanfun.com/plugins/vue/2.6.10/vue.min.js"></script> -->
		<!-- 如果有載入topBar.js則不需要，因為topBar.js已自帶GA_CodeNew.js -->
		<script language="javascript" src="https://tw.beanfun.com/js/GA_CodeNew.js"></script>
		<!-- GTM -->
		<script>
			(function (w, d, s, l, i) {
				w[l] = w[l] || [];
				w[l].push({
					"gtm.start": new Date().getTime(),
					event: "gtm.js"
				});
				var f = d.getElementsByTagName(s)[0],
					j = d.createElement(s),
					dl = l != "dataLayer" ? "&l=" + l : "";
				j.async = true;
				j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
				f.parentNode.insertBefore(j, f);
			})(window, document, "script", "dataLayer", "{{GTM}}");
		</script>
		<script type="module" crossorigin src="./js/default.js"></script>
		<link rel="stylesheet" href="./assets/css/index.css" />
	</head>
	<body>
		<!-- GTM -->
		<noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ GTM }}" height="0" width="0" style="display: none; visibility: hidden"></iframe></noscript>
		<form id="form1" runat="server">
			<!-- 內容開始 -->
			<div id="app"></div>
		</form>
		<script type="text/javascript" src="https://tw.hicdn.beanfun.com/beanfun/GamaWWW/allProducts/script/game-footer.js" id="game-footer" prod="天堂" theme="dark"></script>
		<input type="hidden" name="tkn" id="tkn" value="" runat="server" />
		<input type="hidden" name="hfEventIndex" id="hfEventIndex" value="" runat="server" />
	</body>
</html>
