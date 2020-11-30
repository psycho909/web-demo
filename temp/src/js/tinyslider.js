/*
<div class="maplestyle-slide-wrap">
    自定義 nav dot
    <div class="maplestyle-slide-dot-wrap">
        <span class="maplestyle-slide-dot"></span>
        <span class="maplestyle-slide-dot"></span>
        <span class="maplestyle-slide-dot"></span>
        <span class="maplestyle-slide-dot"></span>
        <span class="maplestyle-slide-dot"></span>
        <span class="maplestyle-slide-dot"></span>
    </div>

    slide的內容
    
    <div class="maplestyle-slide-box">
        <a href="https://youtu.be/pbibYJqFunk" class="maplestyle-slide" target="_blank"></a>
        <a href="javascript:;" class="maplestyle-slide" target="_blank"></a>
        <a href="javascript:;" class="maplestyle-slide" target="_blank"></a>
        <a href="javascript:;" class="maplestyle-slide" target="_blank"></a>
        <a href="javascript:;" class="maplestyle-slide" target="_blank"></a>
        <a href="javascript:;" class="maplestyle-slide" target="_blank"></a>
    </div>

    自定義的 上一頁
    <a href="javascript:;" class="maplestyle-slide-prev"><img src="images/maplestyle-prev.png" /></a>
    自定義的 下一頁
    <a href="javascript:;" class="maplestyle-slide-next"><img src="images/maplestyle-next.png" /></a>
</div>
*/

var slider = tns({
    container: '.maplestyle-slide-box', // 
    loop: false,
    autoplay: false,
    autoplayButtonOutput: false,
    items: 1,
    slideBy: 'page',
    nav: true,
    navContainer:".maplestyle-slide-dot-wrap", // 自定義的 nav dot
    prevButton: '.maplestyle-slide-prev', // 自定義的 上一頁
    nextButton: '.maplestyle-slide-next', // 自定義的 下一頁
});