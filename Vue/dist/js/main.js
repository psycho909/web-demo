require.config({
    baseUrl:"./js",
    shim:{
        "vue":{
            exports:"vue"
        },
    },
    paths:{
        "vue":"./vue.min",
        "jquery":"./jquery-3.1.1.min",
        "text":"./text",
        "json":"./json"
    }
});

require(["jquery","vue","components/Home"],function($,Vue,Home){
    new Vue({
        el:"#app",
        mounted:function(){
            this.$refs.loading.className="show"
        },
        components:{
            Home:Home
        },
        data:{
            msg:"Hello World"
        }
    })
})