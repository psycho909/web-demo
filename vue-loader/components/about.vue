<template>
    <div>About {{id}}</div>
</template>
<script>
module.exports={
    data:function(){
        return {
            id:""
        }
    },
    mounted:function(){
        this.id=this.$route.params.id
    },
    beforeRouteEnter :function(to,from,next){
        console.log(to,from)
        next()
    }
}
</script>