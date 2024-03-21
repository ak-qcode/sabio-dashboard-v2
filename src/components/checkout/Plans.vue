<template>
  <div>
    <h3 class="font-semibold text-lg text-white">Plans and Pricing</h3>
    <RadioGroup v-model="store.selectedPlan" class="mt-4">
      <RadioGroupLabel class="sr-only">Pricing plans</RadioGroupLabel>
      <div class="flex flex-wrap flex-col gap-4 -space-y-px rounded-xl">
        <RadioGroupOption v-for="plan in store.plans"
            :key="plan.name"
            v-slot="{ checked, active }"
            :value="plan"
            as="template">
            <div :class="[checked ? 'z-10 border-light-blue-color ' : 'border-transparent ', 'relative flex cursor-pointer flex-col border p-6 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6 rounded-xl backdrop-blur-sm bg-white/5']">
              <span class="flex items-center text-sm">
                <RadioButton :checked="checked" :active="active" />
                <RadioGroupLabel class="ml-3 text-2xl text-white font-medium" as="span">{{ plan.name }}</RadioGroupLabel>
              </span>
              <RadioGroupDescription :class="[ 'ml-6 pl-1 text-sm md:ml-0 md:pl-0 text-white md:text-right self-end']"
                                    as="span">
                Initial balance
              </RadioGroupDescription>
              <RadioGroupDescription :class="['ml-6 pl-1 md:ml-0 md:pl-0 md:text-right text-white text-2xl']"
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
import RadioButton from "@/components/ui/Input/RadioButton.vue";

const store = useCheckoutStore()

</script>
