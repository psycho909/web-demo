/*
使用說明
傳入 input的class

<!--[if IE]>
<script>
    add_placeholder("task1");
</script>
<![endif]-->

*/

function add_placeholder(clas,color) {
    var el = document.getElementsByClassName(clas);

    for (var i = 0, len = el.length; i < len; i++) {
        el[i].onfocus = function () {
            if (this.value == this.getAttribute("placeholder")) {
                this.value = "";
                this.style.cssText = "";
            }
        }
        el[i].onblur = function () {
            if (this.value.length == 0) {
                this.value = this.getAttribute("placeholder");
                this.style.cssText = 'color:'+color+';';
            }
        }
        el[i].onblur();
    }
}