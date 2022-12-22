<template>
    <div
        v-click-outside="onClose"
        class="context-menu-tool"
        :style="style"
        v-if="props.visible"
    >
        <slot></slot>
    </div>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps(['visible', 'pos'])
const emit = defineEmits(['close'])

const style = computed(() => {
    return { left: props.pos.x + 'px', top: props.pos.y + 'px' }
})

function onClose() {
    emit('close')
}

</script>
<style scoped>
.context-menu-tool {
  position: fixed;
  width: 80px;
  min-height: 120px;
  text-align: center;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, .3);
}
</style>