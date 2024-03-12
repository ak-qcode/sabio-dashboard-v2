<template>
  <div>
    <h3 class="font-semibold text-md">Plans and Pricing</h3>
    <RadioGroup v-model="selected" class="mt-4">
      <RadioGroupLabel class="sr-only">Pricing plans</RadioGroupLabel>
      <div class="flex flex-wrap flex-col gap-4 -space-y-px rounded-md">
        <RadioGroupOption v-for="plan in plans"
                          :key="plan.name"
                          v-slot="{ checked, active }"
                          :value="plan"
                          as="template">
          <div :class="[checked ? 'z-10 border-indigo-200 bg-indigo-50' : 'border-gray-200', 'relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6 bg-white rounded-md']">
            <span class="flex items-center text-sm">
              <span :class="[checked ? 'bg-indigo-600 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-indigo-600' : '', 'h-4 w-4 rounded-full border flex items-center justify-center']"
                    aria-hidden="true">
                <span class="rounded-full bg-white w-1.5 h-1.5"/>
              </span>
              <RadioGroupLabel :class="[checked ? 'text-indigo-700' : 'text-gray-900', 'ml-3 text-lg font-medium']"
                               as="span">{{
                  plan.name
                }}</RadioGroupLabel>
            </span>
            <RadioGroupDescription :class="[checked ? 'text-indigo-700' : 'text-gray-500', 'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right self-center']"
                                   as="span">
              Initial balance
            </RadioGroupDescription>
            <RadioGroupDescription :class="[checked ? 'text-indigo-700' : 'text-gray-900', 'ml-6 pl-1 md:ml-0 md:pl-0 md:text-right text-2xl']"
                                   as="span">
              {{ plan.initialBalance }}
            </RadioGroupDescription>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>

<script lang="ts" setup>
import {RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption} from '@headlessui/vue'

const selected = defineModel('selected')

defineProps([
  'plans',
])

</script>
