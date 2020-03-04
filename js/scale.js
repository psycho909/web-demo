!function(n) {
    var r = navigator.userAgent
      , i = n(window).width()
      , o = (n(window).height(),
    i / 1920);
    function t(i) {
        0 < r.indexOf("MSIE") ? n(".wrap").css({
            width: "1920px",
            zoom: i
        }) : n(".wrap").css({
            width: "1920px",
            "-ms-transform": "scale(" + i + ")",
            "-moz-transform": "scale(" + i + ")",
            "-webkit-transform": "scale(" + i + ")",
            transform: "scale(" + i + ")",
            "-ms-transform-origin": "0px 0px 0px",
            "-moz-transform-origin": "0px 0px 0px",
            "-webkit-transform-origin": "0px 0px 0px",
            "transform-origin": "0px 0px 0px"
        }),
        n(".main").css({
            width: n(window).width(),
            height: n(".wrap").height() * i
        })
    }
    t(o),
    n(window).resize(function() {
        i = n(window).width(),
        n(window).height(),
        t(o = i / 1920)
    })
    n(function(){
        i = n(window).width(),
        n(window).height(),
        t(o = i / 1920)
    })
}(jQuery);