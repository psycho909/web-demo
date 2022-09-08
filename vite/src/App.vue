<script setup>
import { GetUserData } from "./api";
import { MessageLB } from "./lightbox";
import { loadingHide, loadingShow } from "./loading";
import { mainStore } from "./store/index";
const page = ref("entry")
const store = mainStore()
onMounted(() => {
    loadingShow()
    let token = $("#tkn").val() || "biFVVX0KVbVHixPaUqjAPowlqMrSUGn772B5+A+oI24mBN9G7UdtS5BR/RVNymshloeBbiIb9QQcAybu44w+TQ5JQNLThJDHSksEus2Alm3BIu3dO5YD86pl/FhBnRhxU8+LBD3UhHSLbfXsOD8ESwrSf39JYpv3N8kga2aBLvTpt46Ibfr5MqHtmCU4CKn66vXd7pSTCJwowNPQwsRnyu3Ln0wEN6jDrJFQ1nLQ3VsV2wcid0EQouYqGBrnyaqRymXuo4NPo0wZ0elfuLduexMO32oEHnJZ+Y6QeAsM/NsFZiJobQwN/kUfvwTlwjN1QiCrxUbi9j0WDoC+ColAMPZ3deF1GovsSEluCrHh3lYQN8TgADgHuvcyh6AmkRg2InxZsUcaSj8zdgQ53zzWzBy4IeGJsR5TFDz7Rk3wCdi6sCPr1SwuTO4vGmNy32tP/XVxHvXXOb1kpTd0V4qVlIOCvXB8iNEELGC4GvjFd6UMP5Z8NT97qMbkDdPDqKwHGuC8af/VywP4j2peEEgNYanJqn/KKfNm5owhsqYN//1EHETIXGD9+sciuxI9Ile+K/ctjgADU+KG1VGUH/MzysRL0wmEz74NmmIuL1wjL84="
    store.setAccountToken(token);
    GetUserData(store.getData).then((res) => {
        const { Code, Message, url } = res.data;
        if (Code == -1) {
            MessageLB(Message, url)
            return;
        }
        if (Code == -2) {
            MessageLB(Message)
            return;
        }
        if (Code == 1) {
            const { Data } = res.data;
            store.init(Data)
        }
    }).catch((err) => {
        MessageLB(err)
    }).finally(() => {
        loadingHide()
    });
})
</script>

<template>
    <Top v-memo="[store.CharName]"></Top>
    <Entry :page="store.page" v-memo="[store.page]"></Entry>
    <Doll :page="store.page" v-if="store.page == 'doll'"></Doll>
</template>
