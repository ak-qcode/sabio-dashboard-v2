<script setup lang="ts">
import { withDefaults, defineProps, defineEmits } from 'vue'

interface Props {
  type: 'button' | 'submit' | 'reset'
}

const emit = defineEmits(['click'])

const props = withDefaults(defineProps<Props>(), {
  type: 'button'
})

function onClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <button
    class="rounded-xl border border-white border-opacity-10 bg-gradient-to-r from-dark-blue-color to-blue-color px-6 py-3 text-lg font-medium text-white shadow-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
    :type="props.type"
    @click="onClick">
      <slot/>
  </button>
</template>
