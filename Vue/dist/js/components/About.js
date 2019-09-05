define(['vue',"text!./About.html"],function(Vue,About){
    return {
        template:About,
        props:["about"],
        data:function(){
            return {
                addr:"ADDRR"
            }
        },
        methods:{
            getAddr(){
                this.$emit("getaddr",this.addr)
            }
        }
    }
})