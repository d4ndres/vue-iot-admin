<script setup lang="ts">

import NavItem from '@/components/NavItem.vue'
import type { NavItem as NavItemType } from '@/types.d.ts'

interface Props {
  navList: NavItemType []
}
defineProps<Props>();
</script>

<template>
  <aside>
    <RouterLink v-for="item in navList" :key="item.name" :to="{ name: item.name }">
      <NavItem :data="item" />
    </RouterLink>
  </aside>
</template>