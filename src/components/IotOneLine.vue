<script setup>
import Chart from 'chart.js/auto'
import { nextTick, ref, shallowRef, watch, onMounted, defineProps } from 'vue'

const vueJsCharts = shallowRef(null)
const canvasChartEl = ref(null)

const { log, nLastSamples, title, configChart } = defineProps({
  log: {
    type: Array
  },
  nLastSamples: {
    type: Number,
    default: Infinity
  },
  title: {
    type: String,
    default: 'History line'
  },
  configChart: {
    type: Object,
    default: {
      fill: true,
      borderColor: 'rgba(27, 255, 255, 1)',
      backgroundColor: 'rgba(0,150,191, 0.4)',
      tension: 0.1
    }
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

onMounted(() => {
  if (log.length) {
    const samples = [...log]
    initCanvasChart(samples)
  }
})

const initCanvasChart = (samples) => {
  vueJsCharts.value = new Chart(
    canvasChartEl.value.getContext('2d'),
    {
      type: 'line',
      data: {
        labels: samples
          .sort((a, b) => a.date - b.date)
          .map(s => formatDate(s.date)),
        datasets: [
          {
            label: title,
            data: samples
              .sort((a, b) => a.date - b.date)
              .map(s => s.value),
            ...configChart
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
      .map(s => formatDate(s.date))
      .slice(-nLastSamples)
    vueJsCharts.value.data.datasets[0].data = samples
      .sort((a, b) => a.date - b.date)
      .map(s => s.value)
      .slice(-nLastSamples)
    vueJsCharts.value.update()
    return
  }

  nextTick(() => {
    initCanvasChart(samples)
  })

}, { deep: true })

</script>
<template>
  <canvas class="h-auto w-auto" ref="canvasChartEl"></canvas>
</template>