<template>
	<div>
        <world :fruits="fruitsOfTheNinja">
            <template #fruit="fruit">
                {{fruit.fruit.name}}
                <button @click="fruit.slice(fruit.fruit.id)">⚔️ Style Slicing</button>
            </template>
        </world>
        <div>hello {{result}}</div>
        <input type="text" v-model="name">
        <ul>
            <li v-for="(m,index) in member">
                <span>{{m}}</span>
                <input type="text" v-model="rename">
                <button @click="edit(index)">EDIT</button>
                <button @click="del(index)">DEL</button>
            </li>
        </ul>
        <button @click="add()">Add</button>
	</div>
</template>
<script>

module.exports={
    props:["title"],
    components:{

    },
    data: function() {
        return {
            name: "",
            rename: "",
            fruitsOfTheNinja: [
                {
                    id: 1,
                    name: "🍋Lemon",
                },
                {
                    id: 2,
                    name: "🥝Kiwi",
                    recipe: "Kiwi, Baijiu & Red Date Yoghurt Cocktail 🍸",
                },
                {
                    id: 3,
                    name: "🍑Peach",
                },
                {
                    id: 4,
                    name: "🍌Banana",
                },
                {
                    id: 5,
                    name: "🍎Apple",
                },
            ],
        }
    },
    components: {
        world: "url:./world.vue",
    },
    computed:{
        member:function(){
            return this.$store.getters.member
        },
        result:function(){
            return this.$store.getters.result
        }
    },
    methods:{
        add:function(){
            var _name=this.name;
            this.$store.dispatch({
                type:"add",
                user:{
                    name:_name
                }
            })
            this.name="";
        },
        del:function(index){
            this.$store.dispatch({
                type:"del",index:index
            })
        },
        edit:function(index){
            var _name=this.rename;
            this.$store.dispatch({
                type:"edit",index:index,user:{name:_name}
            })
        }
    }
}
</script>

