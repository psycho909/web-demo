// A no-dependancy quick and dirty method of adding basic
// placeholder functionality to Internet Explorer 5.5+
// Author: Jay Williams <myd3.com>
// License: MIT License
// Link: https://gist.github.com/1105055

function add_placeholder (id){
    var el = document.getElementById(id);
    el.placeholder = el.getAttribute('placeholder');

    el.onfocus = function (){
        if(this.value == this.placeholder){
            this.value = '';
            el.style.cssText  = '';
        }
    };

    el.onblur = function (){
        if(this.value.length == 0){
            this.value = this.placeholder;
            el.style.cssText = 'color:#A9A9A9;';
        }
    };

    el.onblur();
}

// Add right before </body> or inside a DOMReady wrapper
add_placeholder('myInputField');

function add_placeholder2(clas,color) {
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