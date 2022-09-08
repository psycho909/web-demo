<script setup>
import { SelectType } from "../lightbox";
import { mainStore } from "../store/index";
const store = mainStore()

// 啟動遊戲
const openSelectType = () => {
    SelectType()
}
onMounted(() => {
})
</script>
<template>
    <div class="top-info">
        <div class="top-info__list">
            <a href="https://tw.beanfun.com/lineage/main.aspx" class="top-info__link" target="_blank">月費服</a>
            <a href="https://tw.beanfun.com/lineagefree/index.aspx" class="top-info__link" target="_blank">免費服</a>
            <a href="javascript:;" class="top-info__link top-info__link--game" @click="openSelectType">啟動遊戲</a>
            <a href="https://event.beanfun.com/lineage/Download/Index.aspx" class="top-info__link"
               target="_blank">下載遊戲</a>
        </div>
        <div class="top-info__account" v-if="store.CharName">
            <span class="top-info__account-icon"></span>
            <span class="top-info__account-text">{{ store.CharName || "" }}</span>
        </div>
    </div>
</template>