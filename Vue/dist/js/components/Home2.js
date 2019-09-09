define(['vue',"text!./Home2.html"],function(Vue,Home2){
    return {
        template:Home2,
        data(){
            return {
                isShow:false,
                title:"HOME2"
            }
        },
        methods:{
            setModal:function(){
                this.isShow=!this.isShow
                this.$emit("set_modal",this.isShow,this.title)
            }
        }
    }
})