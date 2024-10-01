<script setup>
import IotButton from '@/components/button/IotButton.vue'

const { modelValue } = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
  emit('close', false)
}
</script>

<template>
  <div class="overflow fixed h-full w-full left-0 top-0 z-50" v-show="modelValue">
    <div @mousedown="close" :class="{'open': modelValue}" class="curtain w-full h-full flex flex-row-reverse">
      <div @mousedown.stop class="overflow-body shadow-xl shadow-zinc-950 h-full w-full md:w-1/2 bg-background">
        <slot name="default" :close="close">
          <IotButton class="absolute top-4 left-4" @click="close">soma</IotButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overflow {
  transition: display .3s ease allow-discrete;
}

.curtain.open {
  background: rgba(0,0,0, 0);
  backdrop-filter: blur(4px);
  transition: .3s ease;

  @starting-style {
    background: rgba(0,0,0,0);
    backdrop-filter: blur(0px);
  }
}
.curtain {
  transition: all .3s ease;
  backdrop-filter: blur(0px);
  background: rgba(0,0,0,0);
}

.curtain.open .overflow-body {
  transform: translateX(0);
  transition: all .3s ease;
  @starting-style {
    transform: translateX(100%);
  }
}

.curtain .overflow-body {
  transform: translateX(100%);
  transition: all .3s ease;
}
</style>