define(['vue',"text!./Home.html","json!json/Home.json","./About"],function(Vue,Home,Home_json,About){
    return {
        template:Home,
        components:{
            About:About
        },
        mounted:function(){
            console.log()
        },
        data:function(){
            return {
                addr:"Home .road",
                teams:Home_json,
                toabout:"How About!!!!"
            }
        },
        methods:{
            getChild(data){
                this.addr=data
                console.log(data)
            }
        }
    }
})