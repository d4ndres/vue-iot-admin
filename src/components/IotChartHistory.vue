<script setup>
import Chart from 'chart.js/auto'
import { nextTick, ref, shallowRef, watch, onMounted } from 'vue'

const vueJsCharts = shallowRef(null)
const canvasChartEl = ref(null)

const { log } = defineProps({
  log: {
    type: Array
  }
})

onMounted(() => {
  if(log.length) {
    const samples = [...log]
    initCanvasChart(samples)
  }
})

const initCanvasChart = ( samples ) => {
  vueJsCharts.value = new Chart(
    canvasChartEl.value.getContext('2d'),
    {
      type: 'line',
      data: {
        labels: samples
          .sort((a, b) => a.date - b.date)
          .map(s => new Date(s.date)
            .toLocaleDateString()),
        datasets: [
          {
            label: 'Sample',
            data: samples
              .sort((a, b) => a.date - b.date)
              .map(s => s.value),
            fill: true,
            borderColor: 'rgba(27, 255, 255, 1)',
            backgroundColor: 'rgba(0,150,191, 0.4)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  )
}

watch(() => log, (signal) => {
  const samples = [...signal]

  if (vueJsCharts.value) {
    vueJsCharts.value.data.labels = samples
      .sort((a, b) => a.date - b.date)
      .map(s => String(s.date))
      .slice(-7)
    vueJsCharts.value.data.datasets[0].data = samples
      .sort((a, b) => a.date - b.date)
      .map(s => s.value)
      .slice(-7)

    console.log(vueJsCharts.value.data)
    vueJsCharts.value.update()

    return
  }


  nextTick(() => {
    initCanvasChart(samples)
  })

}, { deep: true })

</script>
<template>
  <canvas ref="canvasChartEl"></canvas>
</template>