<script setup>
import IotButton from '@/components/button/IotButton.vue'
import IotChartHistory from '@/components/IotChartHistory.vue';
import { shallowRef, computed, ref, getCurrentInstance } from 'vue';

const randomSignal = ref([])
const lastSample = computed(() => {
  return randomSignal.value.sort((a,b) => a.date - b.date)[randomSignal.value.length - 1] || ({ value: 0 })
})

const addPice = () => {
  const random = (Math.random()*2 - 1) + lastSample.value.value
  randomSignal.value.push({
    value: random,
    date: new Date().getTime()
  })
}

</script>

<template>
  <h1>Dashboard</h1>
  <IotButton @click="addPice">Add</IotButton>
  <div>
    <IotChartHistory :log="randomSignal"/>
  </div>
  <div>
    {{ randomSignal }}
  </div>
  <div>
    {{ lastSample }}
  </div>
</template>