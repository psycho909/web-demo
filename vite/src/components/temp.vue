<script setup>
import { Base } from "../api";
import { MessageLB } from "../lightbox";
import { mainStore } from "../store/index";
const store = mainStore()
const control = ref(false)
const open = () => {
    MessageLB(store.account)
}
const close = () => {
    control.value = false
}
onMounted(() => {
    Base(2).then((res) => {
        console.log(res)
    })
})
</script>
    <template>
    <div class="top-info">
        <div class="top-info__list">
            <a href="javascript:;" class="top-info__link" target="_blank">月費服</a>
            <a href="javascript:;" class="top-info__link" target="_blank">免費服</a>
            <a href="javascript:;" class="top-info__link top-info__link--game" target="_blank">啟動遊戲</a>
            <a href="javascript:;" class="top-info__link top-info__link--download" target="_blank">下載遊戲</a>
            <a href="javascript:;" class="top-info__link top-info__link--download" @click="open">測試</a>
        </div>
        <Modal />
        <div class="top-info__account">
            <span class="top-info__account-icon"></span>
            <span class="top-info__account-text">{{ store.account }}</span>
        </div>
        <Gbox addClass="default lb-message" :hasCloseBtn="true" :hasActionBtn="true" v-model="control">
            <template #content>
                <div class="lb-message__text">{{ store.account }}</div>
            </template>
            <template #actionBtns>
                <a class="gbox-btn lb-btn__close" href="javascript:;" @click="close">關閉</a>
            </template>
        </Gbox>
    </div>
</template>