define(['vue',"text!./Home.html","json!json/Home.json","./About"],function(Vue,Home,Home_json,About){
    return {
        template:Home,
        components:{
            About:About
        },
        data:function(){
            return {
                addr:"Home .road",
                teams:Home_json,
                toabout:"How About!!!!"
            }
        }
    }
})