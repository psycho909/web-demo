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