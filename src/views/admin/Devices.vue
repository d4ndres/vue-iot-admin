<script setup>
import IotTable from '@/components/IotTable.vue'
import FormInput from '@/components/form/Input.vue'
import ButtonSwitch from '@/components/button/Switch.vue'
import { ref } from 'vue'

const maquetaDevices = ref([
  { name: "Home", dId: "1234", templateName: "Power Sensor", templateId: "4das65d4as", saverRule: false },
  { name: "Farm", dId: "2364", templateName: "Power Sensor", templateId: "da467saw", saverRule: false },
  { name: "Office", dId: "3487", templateName: "Temperature Sensor", templateId: "gs564das", saverRule: true },
  { name: "Garage", dId: "4578", templateName: "Motion Sensor", templateId: "asd56fasd", saverRule: true },
  { name: "Greenhouse", dId: "5689", templateName: "Humidity Sensor", templateId: "f65ds4das", saverRule: false },
  { name: "Warehouse", dId: "6789", templateName: "Light Sensor", templateId: "hf56dsas", saverRule: true },
  { name: "Attic", dId: "7890", templateName: "Smoke Detector", templateId: "qwe46dsa", saverRule: false },
  { name: "Workshop", dId: "8901", templateName: "Vibration Sensor", templateId: "rty46das", saverRule: true },
  { name: "Basement", dId: "9012", templateName: "Water Leak Sensor", templateId: "ghj56fds", saverRule: true },
  { name: "Living Room", dId: "0123", templateName: "Air Quality Sensor", templateId: "klm76das", saverRule: false },
  { name: "Living Room", dId: "2123", templateName: "Air Quality Sensor", templateId: "klm76das", saverRule: false },
  { name: "Living Room", dId: "3123", templateName: "Air Quality Sensor", templateId: "klm76das", saverRule: false },
  { name: "Living Room", dId: "4123", templateName: "Air Quality Sensor", templateId: "klm76das", saverRule: false },
]);


const toggleSaverRule = (rowIndex) => {
  const row = maquetaDevices.value[rowIndex]
  maquetaDevices.value.splice(rowIndex, 1, { ...row, saverRule: !row.saverRule })
}

const columnsTable = [
  { text: "ID", autoValue: ({ index }) => `${index + 1}` },
  { bindKey: "name", text: "Name" },
  { text: "Full name", autoValue: ({ row }) => `${row.name} ${row.dId}` },
  { bindKey: "dId", text: "Device ID" },
  { bindKey: "templateName", text: "Template Name" },
  { bindKey: "templateId", text: "Template ID" },
  { bindKey: "actions", text: "Actions" },
  { bindKey: "saverRule", text: "save on DB" }
]

import OverflowAside from '@/components/OverflowAside.vue';
const controllerOverflow = ref(false)
const searchFilter = ref('')
</script>

<template>
  <div class="p-4">
    <OverflowAside v-model="controllerOverflow"></OverflowAside>

    <h1 @click="controllerOverflow = true" class="text-2xl mb-4">devices</h1>
    <div>
      <button 
      @click="controllerOverflow = true"
      class="border border-1 border-border px-2 py-1 rounded-lg">Hola</button>
    </div>
    
    <div class="max-w-[300px]">
      <FormInput class="bg-background_dark mt-4 mb-2" v-model="searchFilter" placeholder="Filtrar por contenido" />
    </div>
    <IotTable :searchFilter="searchFilter" :data="maquetaDevices" :columns="columnsTable">
      <template #default="{ value, key, row, rowIndex }">
        <div v-if="key == 'actions'" class="flex justify-center">
          <ButtonSwitch :value="row.saverRule" @click="toggleSaverRule(rowIndex)" />
        </div>
      </template>
    </IotTable>
  </div>
</template>