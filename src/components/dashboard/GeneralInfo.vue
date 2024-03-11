<script setup lang="ts">
import {computed} from "vue";

const props = defineProps(['data'])

const isLoading = computed(() => !props.data)
</script>

<template>
  <div :class="['rounded-xl border border-gray-200 lg:w-1/2 bg-white px-4 py-5 sm:px-6', isLoading ? 'animate-pulse' : '']">
    <div class="flex justify-between">
      <div>
        <h4 class="text-base text-gray-500">Account size</h4>
        <span class="font-semibold text-5xl text-primary" v-if="props.data?.accountBalance">
          {{ props.data.accountBalance }}</span>
        <div v-else class="h-12 bg-gray-200 rounded-full dark:bg-gray-700 w-32"/>
      </div>
      <div>
        <h4 class="text-base text-gray-500">Equity</h4>
        <span class="font-semibold text-5xl text-primary" v-if="props.data?.accountEquity">
          {{ props.data.accountEquity }}</span>
        <div v-else class="h-12 bg-gray-200 rounded-full dark:bg-gray-700 w-32"/>
      </div>
    </div>

    <table class="mt-6">
      <tbody>
      <tr>
        <td class="pr-3">Start Date</td>
        <td>
          <span v-if="props.data?.startTradeDate">{{ props.data.startTradeDate }}</span>
          <div v-else class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24"/>
        </td>
      </tr>
      <tr>
        <td class="pr-3">End Date</td>
        <td>
          <span v-if="props.data?.endTradeDate">{{ props.data.endTradeDate }}</span>
          <div v-else class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
