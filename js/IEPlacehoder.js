function add_placeholder2(color) {
    var el = document.getElementsByTagName("input");

    for (var i = 0, len = el.length; i < len; i++) {
    	if(el[i].getAttribute("placeholder")){
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
}