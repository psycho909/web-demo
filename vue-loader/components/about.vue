<template>
    <div>About</div>
</template>
<script>
module.exports={
    beforeRouteEnter :function(to,from,next){
        console.log(to,from)
        next()
    }
}
</script>