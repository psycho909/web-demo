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
                toabout:"How About!!!!",
                isShow:false,
                title:"Home"
            }
        },
        methods:{
            getChild(data){
                this.addr=data
                console.log(data)
            },
            appendComponent(){
                var ComponentClass=Vue.extend(About);
                var instance=new ComponentClass();
                instance.$mount();
                this.$refs.home.appendChild(instance.$el)
            },
            setModal(){
                this.isShow=!this.isShow
                this.$emit("set_modal",this.isShow,this.title)
            }
        }
    }
})