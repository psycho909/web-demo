<template>
	<div>
        <loading :status="this.$store.state.loading"></loading>
        <world :fruits="fruitsOfTheNinja">
            <template #fruit="slotProps">
                {{slotProps.fruit.name}}
                <button @click="slotProps.slice(slotProps.fruit.id)">⚔️ Style Slicing</button>
            </template>
        </world>
        <div>hello {{result}}</div>
        <button @click="init">INIT MEMBER</button>
        <div>請查找<input type="text" v-model="findName"></div>
        <div>請輸入<input type="text" v-model="first"><input type="text" v-model="last"></div>
        <ul v-if="member.length">
            <li v-for="(m,index) in member">
                <span>{{m.name.first}} {{m.name.last}}</span>
                <!-- <input type="text" :ref="'m_'+index" :value="m.name"> -->
                <!-- <button @click="edit(index)">EDIT</button> -->
                <button @click="del(index)">DEL</button>
            </li>
        </ul>
        <div v-if="this.$store.state.error">{{this.$store.state.error}}</div>
        <button @click="add()">Add</button>
	</div>
</template>
<script>

module.exports={
    data: function() {
        return {
            findName:"",
            first: "",
            last: "",
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
            var _first=this.first;
            var _last=this.last;
            this.$store.dispatch({
                type:"add",
                user:{
                    name:{
                        first:_first,
                        last:_last
                    }
                }
            })
            this.first="";
            this.last="";
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
        },
        init:function(){
            this.$store.dispatch({
                type:"init"
            })
        }
    }
}
</script>

