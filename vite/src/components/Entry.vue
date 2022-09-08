<script setup>
import { GetCharacterList, GetServerList, GetUserData } from "../api";
import { Info, MessageLB, SelectDoll } from "../lightbox";
import { loadingHide, loadingShow } from "../loading";
import { mainStore } from "../store/index";
const props = defineProps(["page"])
const store = mainStore()
let ajax = false;

// 參加活動
const eventJoin = () => {
    if (ajax) {
        return
    }
    loadingShow()
    ajax = true
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
        if (Code == 0) {
            return GetServerList(store.getData)
        }
        if (Code == 1) {
            const { Data } = res.data;
            store.init(Data)
            store.changePage("doll")
            return
        }
    }).then((res) => {
        if (res) {
            const { Code, Message, url, ListData } = res.data;
            if (Code == -1) {
                MessageLB(Message, url);
                return;
            }
            if (Code == -2) {
                MessageLB(Message);
                return;
            }
            SelectDoll(ListData);
        }
    }).catch((err) => {
        store.changePage("doll")
        MessageLB(err)
    }).finally((res) => {
        loadingHide()
        ajax = false
    });
}

// 活動資訊
const eventInfo = () => {
    Info()
}

// 選伺服器事件
$("body").on("change", "#server", function () {
    if (ajax) {
        return;
    }
    var serverId = $("#server option:checked").val();
    store.setServerId(serverId);
    loadingShow()
    ajax = true
    GetCharacterList(store.getData).then((res) => {
        const { Code, Message, url, ListData } = res.data;
        if (Code == -1) {
            MessageLB(Message, url)
            return;
        }
        if (Code == -2) {
            MessageLB(Message)
            return;
        }
        var characterHTML = '<option value="-1">選擇遊戲角色</option>';
        if (ListData.length > 0) {
            ListData.forEach(function (v, i) {
                characterHTML += `<option value="${v.user_id}">${v.user_id}</option>`;
            });
        }
        $("#character").html(characterHTML)
    }).finally(() => {
        ajax = false
        loadingHide()
    })

})
</script>
<template>
    <div class="entry-container container" :class="[props.page == 'entry' ? 'on' : '']">
        <div class="entry-main">
            <div class="entry-btn-group">
                <a href="javascript:;" class="entry-btn entry-btn__join" @click="eventJoin">參加活動</a>
                <a href="javascript:;" class="entry-btn entry-btn__info" @click="eventInfo">活動資訊</a>
            </div>
        </div>
    </div>
</template>