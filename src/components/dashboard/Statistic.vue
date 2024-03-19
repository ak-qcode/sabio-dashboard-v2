<script setup lang="ts">
import {computed} from "vue";
import bgImage from '@/assets/gradient-statistic.png';
import { ref } from 'vue';

const props = defineProps(['data'])

const isLoading = computed(() => !props.data)

const statistics = ref([
  { label: 'Number of Trades', value: 10000 },
  { label: 'Average Win', value: '–' },
  { label: 'Total Lots Traded', value: '$10,000' },
  { label: 'Average Loss', value: '–' },
  { label: 'Win Ratio', value: '10/05/2023' },
  { label: 'Average RRR', value: '–' },
  { label: 'Profit Factor', value: '–' },
  { label: 'Expectancy', value: '–' },
]);

</script>

<template>
  <div :class="['rounded-xl lg:w-1/2 xl:w-3/5 px-4 py-4 sm:px-6 bg-no-repeat bg-cover']" :style="{ backgroundImage: `url(${bgImage})` }">
     <h4 class="text-white text-lg">Statistics</h4>
     <div class="grid grid-cols-1 xl:grid-cols-2 gap-x-16 gap-y-4 pt-4">
      <div class="flex flex-col gap-4 w-full" v-for="(stat, index) in statistics" :key="index">
        <div class="flex justify-between w-full">      
            <h4 class="text-base text-dop-color">{{ stat.label }}</h4>
            <span class="text-white">{{ stat.value }}</span>
        </div>
      </div>
     </div>
  </div>
  </template>
