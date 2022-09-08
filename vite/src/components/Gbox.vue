<script setup>
const props = defineProps({
    addClass: {
        type: String
    },
    hasCloseBtn: {
        type: Boolean, default: false
    },
    hasActionBtn: {
        type: Boolean, default: false
    },
    afterClose: {
        type: Function
    },
    modelValue: {
        type: Boolean, default: true
    }
})

const emit = defineEmits(["update:modelValue"])
const closeBtn = () => {
    emit("update:modelValue", false)
}
</script>
<template>
    <Teleport to="body">
        <div class="gbox" :class="addClass" id="gbox" v-if="modelValue">
            <div class="gbox-module"></div>
            <div class="gbox-wrap">
                <div class="gbox-content">
                    <slot name="content"></slot>
                </div>
                <button class="gbox-close" v-if="hasCloseBtn" @click="closeBtn">×</button>
                <div class="gbox-action" v-if="hasActionBtn">
                    <slot name="actionBtns">
                        <a class="gbox-btn" href="javascript:;" @click="closeBtn">確定</a>
                    </slot>
                </div>
            </div>
        </div>
    </Teleport>
</template>