<template>
  <div
    :class="[
      'h-4 w-4 bg-white rounded-full border flex items-center justify-center',
      checked ? 'border-white' : 'border-medium-blue-color',
      active ? 'ring-2 ring-offset-1 ring-light-blue-color' : '',
    ]"
    aria-hidden="true"
  >
    <span
      :class="[
        'rounded-full w-2 h-2',
        checked ? 'bg-light-blue-color' : 'bg-transparent',
      ]"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RadioButton',
  props: {
    checked: Boolean,
    active: Boolean,
  },
});
</script>


