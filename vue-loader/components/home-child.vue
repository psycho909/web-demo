<template>
    <div>
        <h2>child</h2>
        <button @click="add">add</button>
        <button @click="eventBus">bus</button>
    </div>
</template>
<script>
module.exports={
    methods:{
        add:function() {
            this.$emit("counter",1)
        },
        eventBus:function(){
            Bus.$emit("tobus","Hello Bus")
        }
    }
}
</script>