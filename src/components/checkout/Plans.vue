<template>
  <div>
    <h3 class="font-semibold text-md text-white">Plans and Pricing</h3>
    <RadioGroup v-model="store.selectedPlan" class="mt-4">
      <RadioGroupLabel class="sr-only">Pricing plans</RadioGroupLabel>
      <div class="flex flex-wrap flex-col gap-4 -space-y-px rounded-xl">
        <RadioGroupOption v-for="plan in store.plans"
                          :key="plan.name"
                          v-slot="{ checked, active }"
                          :value="plan"
                          as="template">
          <div :class="[checked ? 'z-10 border-light-blue-color ' : 'border-none ', 'relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6 rounded-xl backdrop-blur-sm bg-white/5']">
            <span class="flex items-center text-sm">
              <span :class="[checked ? 'bg-indigo-600 border-transparent' : ' border-light-blue-color', active ? 'ring-2 ring-offset-2 ring-indigo-600' : '', 'h-4 w-4 rounded-full border flex items-center justify-center']"
                    aria-hidden="true">
                <span class="rounded-full bg-white w-1.5 h-1.5"/>
              </span>
              <RadioGroupLabel :class="[checked ? 'text-indigo-700' : 'text-white', 'ml-3 text-2xl font-medium']"
                               as="span">{{
                  plan.name
                }}</RadioGroupLabel>
            </span>
            <RadioGroupDescription :class="[checked ? 'text-indigo-700' : 'text-white', 'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right self-end']"
                                   as="span">
              Initial balance
            </RadioGroupDescription>
            <RadioGroupDescription :class="[checked ? 'text-indigo-700' : 'text-white', 'ml-6 pl-1 md:ml-0 md:pl-0 md:text-right text-2xl']"
                                   as="span">
              {{ formatMoney(plan.initialBalance) }}
            </RadioGroupDescription>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>

<script lang="ts" setup>
import {RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption} from '@headlessui/vue'
import type {ModelRef} from "@vue/runtime-core";
import type {Plan} from "@/api/types";
import {useCheckoutStore} from "@/stores/checkout";
import {formatMoney} from "@/utils/numberFormatter";
import {unref} from "vue";

const store = useCheckoutStore()

</script>
