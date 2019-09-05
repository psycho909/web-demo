define(['vue',"text!./Home.html","json!json/Home.json","./About"],function(Vue,Home,Home_json,About){
    return {
        template:Home,
        components:{
            About:About
        },
        mounted(){
            console.log("Home")
        },
        data:function(){
            return {
                addr:"Home .road",
                teams:Home_json.teams,
                toabout:"How About!!!!"
            }
        }
    }
})