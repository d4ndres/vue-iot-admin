<script setup>
import IotButton from '@/components/button/IotButton.vue'
import Card from '@/components/Card.vue';
import IotOneLine from '@/components/IotOneLine.vue';
import { computed, ref } from 'vue';

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

for(let i = 0; i < 7; i++) {
  addPice()
}
setInterval(addPice, 700)

</script>

<template>
  <h1 class="px-4 my-2 text-2xl">Dashboard</h1>
  <div class="dashboard-grid">
    <Card>
      <IotOneLine :log="randomSignal" :nLastSamples="10"/>
    </Card>
    <Card>
      <IotOneLine :log="randomSignal" :nLastSamples="10"/>
    </Card>
    <Card>
      <IotOneLine :log="randomSignal" :nLastSamples="10"/>
    </Card>
  </div>
</template>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template: repeat( 3, 1fr) / repeat( 2, 1fr);
}
.dashboard-grid > *:nth-of-type(1) {
  grid-row: 1/3;
}

</style>