<script setup lang="ts">
import NavList from '@/components/NavList.vue'


import type { NavItem } from '@/types.d.ts'
interface Props {
  navList: NavItem []
}
const {navList} = defineProps<Props>()

</script>

<template>
  <div class="bg-background text-text_main h-screen">
    <div class="flex">
      <NavList class="shadow-sm shadow-border bg-background_dark h-screen w-0 md:min-w-60 md:w-1/6 overflow-auto" :navList="navList"></NavList>
      <main class="h-screen w-full overflow-auto">
        <slot></slot>
      </main>
    </div>
    <div class="bg-red-500 h-4 md:h-0 fixed bottom-0 z-10 w-screen">
      <slot name="footer"></slot>
    </div>
  </div>
</template>