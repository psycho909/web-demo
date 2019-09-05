define(['vue',"text!./About.html"],function(Vue,About){
    return {
        template:About,
        props:["about"],
        data:function(){
            return {
            }
        }
    }
})