define(['vue',"text!./Modal.html"],function(Vue,Modal){
    return {
        template:Modal,
        props:["title"],
        methods: {
            close(){
                this.$emit("close")
            }
        }
    }
})