<script setup lang="ts">
import {computed} from "vue";
import bgImage from '@/assets/gradient.png';

const props = defineProps(['data']);

const isLoading = computed(() => !props.data);

</script>

<template>
<div :class="[
    'rounded-xl lg:w-1/2 px-4 py-4 sm:px-6 bg-no-repeat bg-cover',
    isLoading ? 'animate-pulse' : '',
  ]" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="flex justify-between">
      <div>
        <h4 class="text-base text-dop-color">Account size</h4>
        <span class="font-semibold text-[56px] text-white" v-if="props.data?.accountBalance">
          {{ props.data.accountBalance }}</span>
        <div v-else class="h-12 mt-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32"/>
      </div>
      <div>
        <h4 class="text-base text-dop-color">Equity</h4>
        <span class="font-semibold text-[56px] text-white" v-if="props.data?.accountEquity">
          {{ props.data.accountEquity }}</span>
        <div v-else class="h-12 mt-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32"/>
      </div>
    </div>

    <table class="mt-6">
      <tbody>
      <tr>
        <td class="pr-3 text-dop-color">Start Date</td>
        <td>
          <span v-if="props.data?.startTradeDate" class="text-white">{{ props.data.startTradeDate }}</span>
          <div v-else class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24"/>
        </td>
      </tr>
      <tr>
        <td class="pr-3 text-dop-color">End Date</td>
        <td>
          <span v-if="props.data?.endTradeDate" class="text-white">{{ props.data.endTradeDate }}</span>
          <div v-else class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
