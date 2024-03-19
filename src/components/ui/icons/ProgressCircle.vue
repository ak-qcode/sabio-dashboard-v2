<template>
  <div class="progress-container relative inline-flex justify-center items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75">
      <circle cx="37.5" cy="37.5" r="35.25" fill="none" stroke="#ddd" stroke-width="4.5"/>
      <circle
        cx="37.5"
        cy="37.5"
        r="35.25"
        fill="none"
        stroke="#17F871"
        stroke-width="4.5"
        :style="progressStyle"
        transform="rotate(0 37.5 37.5)"
        stroke-linecap="round"
      />
    </svg>
    <span class="text-xs text-white absolute">{{ percentage }}%</span>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
  },
});

const radius = 35.25;
const circumference = 2 * Math.PI * radius;

const progressStyle = computed(() => {
  const progress = props.percentage / 100 * circumference;
  return {
    strokeDasharray: `${progress} ${circumference}`,
    strokeDashoffset: 0,
  };
});
</script>
