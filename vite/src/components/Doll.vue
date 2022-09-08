<script setup>
import { storeToRefs } from "pinia";
import { nextTick } from "vue";
import { GetDailyItem, GetDiaryLog, GetUserData, InsertInviteCode } from "../api";
import { dolls, levelFilter, levels } from "../dollType";
import { DollText, MessageLB, Partners, Task } from "../lightbox";
import { loadingHide, loadingShow } from "../loading";
import { mainStore } from "../store/index";
const props = defineProps(["page"])
const store = mainStore()
const { DollName, Guid, TotalPoint, DollSeq, SecretTechniquePoint, invitelog, partnerdata, IsShowNewDoll } = storeToRefs(store)
// 邀請碼
const inviteCode = ref("")
const evoRef = ref(null)
const dollRef = ref(null)
let ajax = false;
// 娃娃
const dollFilter = computed(() => {
    return dolls.find(function (d, i) {
        return DollSeq.value == d.seq;
    });
})
let videoUrl = ref(null);
// console.log(videoUrl, dollFilter.url)
// 養娃秘笈碼 分享
const shareInvite = () => {
    navigator.clipboard.writeText(Guid.value);
    navigator.clipboard.readText().then((clipText) => {
        DollText(`你的養娃秘笈(${levelFilter(levels, SecretTechniquePoint.value).level})<br/>複製成功`, SecretTechniquePoint.value);
    })
}

// 輸入養娃秘笈碼 確認
const inputInvite = () => {
    if (ajax) {
        return;
    }
    loadingShow()
    ajax = true
    InsertInviteCode(store.getData, inviteCode.value).then((res) => {
        const { Code, Message, url } = res.data;
        if (Code == -1) {
            MessageLB(Message, url)
            return;
        }
        if (Code == -2) {
            MessageLB(Message)
            return;
        }
        MessageLB(`成功輸入${levelFilter(levels, Message).level}養娃秘笈`)
        return GetUserData(store.getData)
    }).then((res) => {
        if (res) {
            const { Code, Message, url } = res.data;
            if (Code == 1) {
                const { Data } = res.data;
                store.init(Data)
                return
            }
        }
    }).finally(() => {
        loadingHide()
        ajax = false
    });

}

// 任務內容
const viewTask = () => {
    Task()
}

// 領禮物
const takeAward = () => {
    if (ajax) {
        return
    }
    loadingShow()
    ajax = true
    GetDailyItem(store.getData).then((res) => {
        const { Code, Message, url } = res.data;
        if (Code == -1) {
            MessageLB(Message, url)
            return;
        }
        DollText(Message)
    }).finally(() => {
        ajax = false
        loadingHide()
    });

}

// 夥伴名單
const partnerList = () => {
    Partners(partnerdata.value, invitelog.value)
}

// 成長日記
const viewDiary = () => {
    GetDiaryLog(store.getData).then((res) => {
        console.log(res)
    })
}

onMounted(async () => {
    IsShowNewDoll.value = 1;
    DollSeq.value = 2;
    await nextTick()
    evoRef.value.play()
    evoRef.value.addEventListener("ended", function () {
        IsShowNewDoll.value = 0
        dollRef.value.play()
    })
})

</script>
<template>
    <div class="doll-container container" :class="[props.page == 'doll' ? 'on' : '']">
        <div class="doll-main">
            <div class="doll-invite__box doll-invite__share">
                <div class="doll-invite__group">
                    <div class="doll-invite__title">養娃秘笈碼</div>
                    <div class="doll-invite__text">{{ Guid || "" }}</div>
                </div>
                <a href="javascript:;" class="doll-btn doll-btn__share" @click="shareInvite">分享</a>
            </div>
            <div class="doll-invite__box doll-invite__input">
                <div class="doll-invite__group">
                    <div class="doll-invite__title">輸入養娃秘笈碼</div>
                    <input type="text" class="doll-invite__code" placeholder="請輸入養娃秘笈碼" v-model="inviteCode" />
                </div>
                <a href="javascript:;" class="doll-btn doll-btn__confirm" @click="inputInvite">確認</a>
            </div>
            <div class="doll-content">
                <div class="doll-name">{{ DollName || " " }}</div>
                <div class="doll-inner">
                    <div class="doll-point">
                        <div class="doll-point__title">累積點數</div>
                        <div class="doll-point__text">{{ TotalPoint || 0 }}</div>
                    </div>
                    <div class="doll-level">
                        <div class="doll-level__title">目前階段</div>
                        <div class="doll-level__text">{{ dollFilter.level || "初生期" }}</div>
                    </div>
                    <div class="doll-doll">
                        <Transition name="fade">
                            <video preload="auto" playsinline muted
                                   class="doll-doll__evo" ref="evoRef" v-if="IsShowNewDoll">
                                <source :src="dollFilter.evo" type="video/mp4">
                            </video>
                        </Transition>
                        <video preload="auto" playsinline muted loop class="doll-doll__doll" ref="dollRef"
                               v-reload="dollFilter.url">
                            <source :src="dollFilter.url" type="video/mp4">
                        </video>
                    </div>
                    <a href="javascript:;" class="doll-btn doll-btn__task" @click="viewTask">任務內容</a>
                    <a href="javascript:;" class="doll-btn doll-btn__gift" @click="takeAward">領禮物</a>
                </div>
            </div>
            <div class="doll-btn-group">
                <a href="javascript:;" class="doll-btn doll-btn__partner" @click="partnerList">夥友名單</a>
                <a href="javascript:;" class="doll-btn doll-btn__diary" @click="viewDiary">成長日記</a>
            </div>
        </div>
    </div>
</template>