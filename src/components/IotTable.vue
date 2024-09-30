<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    default: () => []
  },
  searchFilter: {
    type: String,
    default: ''
  }
})


const computedColumns = computed(() => {
  const cols = props.columns.map(element => {
    if (typeof element === 'string') {
      return { bindKey: element, text: element };
    }
    else if (typeof element === 'object' && element !== null) {
      return { ...element };
    }
    else {
      return Object.keys(props.data[0]).map(key => {
        return { bindKey: key, text: key };
      });
    }
  });
  return cols.length ? cols : Object.keys(props.data[0]).map(key => {
    return { bindKey: key, text: key };
  });
});

const computedData = computed(() => {
  return props.data.map((row, index) => {
    return computedColumns.value.reduce((acc, { bindKey, autoValue, text }) => {
      if (bindKey in row) {
        acc[bindKey] = row[bindKey];
      } else if (typeof autoValue === 'function') {
        acc[text] = autoValue({ row, index });
      } else {
        acc[bindKey] = null;
      }
      return acc;
    }, {});
  });
});



const sortByColumn = ref(null)
const filterData = computed(() => {
  return computedData.value.filter((row) => {
    return Object.values(row).some((value) => {
      return value?.toString().toLowerCase().includes(props.searchFilter.toLowerCase())
    })
  })
    .sort((a, b) => {
      if (sortByColumn.value) {
        if (sortByColumn.value.asc) {
          return a[sortByColumn.value.column] > b[sortByColumn.value.column] ? 1 : -1
        }
        else {
          return a[sortByColumn.value.column] < b[sortByColumn.value.column] ? 1 : -1
        }
      }
      return 0
    })
});

const sortByContent = (columnName) => {
  if (!sortByColumn.value) {
    sortByColumn.value = {
      column: columnName,
      asc: true
    }
  }
  else if (sortByColumn.value.column === columnName && sortByColumn.value.asc) {
    sortByColumn.value = {
      column: columnName,
      asc: false
    }
  }
  else if (sortByColumn.value.column !== columnName) {
    sortByColumn.value = {
      column: columnName,
      asc: true
    }
  }
  else {
    sortByColumn.value = null
  }
}



</script>

<template>
  <div class="wrapper w-full overflow-auto shadow-[inset_0_0_0_1px] shadow-border/80">
    <table class="text-text_main w-full">
      <thead class="sticky top-0 z-10">
        <tr class="h-[5vh]">
          <th v-for="({ bindKey, text }) in computedColumns" :key="`h_${bindKey}`"
            @click="sortByContent(bindKey ?? text)" 
            class=" bg-background_alt
              shadow-[inset_0_0_0_1px] shadow-border/80
              relative px-2 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer" 
              :class="{
                'sort-up border-b-4 border-focus': (bindKey === sortByColumn?.column || text === sortByColumn?.column) && sortByColumn
              }">
            <span>
              {{ text }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in filterData" :key="index" class="">
          <td v-for="(value, key) in row" :key="key" class="
            shadow-[inset_0_0_0_1px] shadow-border/80
            px-2 py-4 whitespace-nowrap">
            <slot name="default" :value="value" :key="key" :row="row" :rowIndex="index">
              {{ value }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.wrapper::-webkit-scrollbar {
  background-color: rgba(0, 0, 0, 0.4);
  width: 10px;
  height: 10px;
}

.wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 5);
}

.wrapper::-webkit-scrollbar-corner {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
