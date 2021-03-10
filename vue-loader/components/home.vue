<template>
    <div>
        <h1>Home</h1>
        <div>{{name | capitalize}}</div>
        <div>{{num}}</div>
        
        <home-child @counter="handleAdd"></home-child>
    </div>
</template>
<script>
module.exports={
    components:{
        "home-child":"url:./home-child.vue",
    },
    created:function(){
        Bus.$off("tobus")
        Bus.$on("tobus",function(data){
            console.log(data)
        })
    },
    data:function(){
        return {
            name:"chen",
            num:0
        }
    },
    filters:{
        capitalize :function(value){
            return value.toUpperCase()
        }
    },
    methods:{
        handleAdd:function(value){
            this.num+=value;
        },
    }
}
</script>
