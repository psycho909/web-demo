<template>
    <ul>
        <li v-for="f in fruits" :key="f.id">
            <slot name="fruit" :fruit="f" :slice="slices"></slot>
        </li>
    </ul>
</template>
<script>
module.exports={
    props:{
        fruits:{
            type:Array
        }
    },
    data:function(){
        return {}
    },
    methods:{
        slices:function(id){
            console.log(id)
        }
    }
}
</script>