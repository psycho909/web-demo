<template>
    <div class="loading" v-if="status">
        <div>Loading...</div>
    </div>
</template>
<script>
module.exports={
    props:["status"]
}
</script>
<style scoped>
    .loading{
        width: 100vw;
        height: 100vh;
        font-size: 30px;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.6);
        color:#fff;
    }
    .loading div{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>