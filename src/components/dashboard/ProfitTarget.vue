<script setup lang="ts">
import {computed} from "vue";
import bgImage from '@/assets/gradient.png';
import ProgressCircle from '@/components/ui/icons/ProgressCircle.vue';

const props = defineProps(['data'])

const isLoading = computed(() => !props.data)

const statistic = [
  { percentage: 25, title: "Profit Target", value: "10000", neededValue: '$800' },
  { percentage: 50, title: "Daily Loss", value: "5000", neededValue: '$800' },
  { percentage: 75, title: "Maximum Loss", value: "2500", neededValue: '$800' },
  { percentage: 100, title: "Active Trading Days", value: "30", neededValue: '$800' },
];

</script>

<template>
  <div :class="[
      'rounded-xl lg:w-1/2 px-4 py-4 sm:px-6 bg-no-repeat bg-cover grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-10',
      isLoading ? 'animate-pulse' : '',
    ]" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="flex gap-4 w-full" v-for="stat in statistic" :key="stat.title">
      <ProgressCircle :percentage="stat.percentage" />
      <div class="flex flex-col gap-4 justify-between">
        <h4 class="text-xs text-dop-color">{{ stat.title }}</h4>
        <div>
          <p class="font-semibold text-lg text-white">
            {{ stat.value }} </p>
          <p class="text-dop-color text-xs" >
            made of {{ stat.neededValue }} </p>
        </div>
      </div>
    </div>
  </div>
  </template>