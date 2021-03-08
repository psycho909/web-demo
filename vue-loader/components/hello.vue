<template>
	<div>
        <world :fruits="fruitsOfTheNinja">
            <template #fruit="slotProps">
                {{slotProps.fruit.name}}
                <button @click="slotProps.slice(slotProps.fruit.id)">⚔️ Style Slicing</button>
            </template>
        </world>
        <div>hello {{result}}</div>
        <div>請查找<input type="text" v-model="findName"></div>
        <div>請輸入<input type="text" v-model="name"></div>
        <ul>
            <li v-for="(m,index) in member">
                <span>{{m}}</span>
                <input type="text" :ref="'m_'+index" :value="m.name">
                <button @click="edit(index)">EDIT</button>
                <button @click="del(index)">DEL</button>
            </li>
        </ul>
        <button @click="add()">Add</button>
	</div>
</template>
<script>

module.exports={
    data: function() {
        return {
            findName:"",
            name: "",
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
            var _this=this;
            if(this.findName != ""){
                return this.$store.getters.member.filter(function(m,i){
                    return m.name == _this.findName 
                })
            }else{
                return this.$store.getters.member
            }
        },
        result:function(){
            return this.$store.getters.result
        },
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
            this.$store.dispatch({
                type:"edit",index:index,user:{name:this.$refs["m_"+index][0].value}
            })
        }
    }
}
</script>

