(function($){

    var GETCLASSES="http://imoocnote.calfnote.com/inter/getClasses.php?curPage=1";

    $.ajaxSetup({
        error:function(){
            alert('Error')
            return false;
        }
    })

    $.getJSON(GETCLASSES,{curPage:1},function(data){
        console.log(data)
        var t=$("#class-template").html();
        var f=Handlebars.compile(t);
        var h=f(data.data);
        $('#classes').html(h);
    })

    Handlebars.registerHelper('equal',function(v1,v2,options){
        if(v1 == v2){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    })

    Handlebars.registerHelper('long',function(v,options){
        if(v.indexOf('小時') != -1){
            return options.fn(this)
        }else{
            return options.inverse(this)
        }
    })

    Handlebars.registerHelper('pag',function(v1,v2){
        var str="";
        str += "<ul>";
        return str;
    })
})(jQuery)