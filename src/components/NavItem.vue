<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import type { NavItem } from '@/types.d.ts'

interface Props {
  data: NavItem
}
defineProps<Props>()

import {useRoute} from 'vue-router'
const route = useRoute()

</script>
<template>
  <div 
  :class="{ 'bg-focus/40': route.name == data.name}"
  class="hover:bg-focus/60 h-12 flex items-center cursor-pointer">
    <li class="px-4 list-none flex gap-1 items-center text-lg">
      <slot>
        <Icon size="18" :name="data.icon" />
        <span v-show="true">{{ data.text }}</span>
      </slot>
    </li>
  </div>
</template>
