<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import type { NavItem } from '@/types.d.ts'

const navList : NavItem[] = [
  { name: 'dashboard', text: 'dashboard', icon: ''},
  { name: 'devices', text: 'devices', icon: ''},
]

</script>

<template>
  <DefaultLayout :navList="navList">
    <RouterView />
  </DefaultLayout>
</template>
