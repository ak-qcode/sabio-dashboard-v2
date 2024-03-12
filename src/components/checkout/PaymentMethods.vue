<script setup lang="ts">
import {ref, watch} from 'vue'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import BankCardForm from "@/components/checkout/BankCardForm.vue";

const paymentMethods = [
  { id: 'bank-card', title: 'Credit / Debit card', body: "via Checkout.com" },
  { id: 'crypto', title: 'Crypto Payment', body: "via CryptoPay" },
  { id: 'other', title: 'Other method', body: "via Pay Retailers" },
]

const selectedPaymentMethod = ref(paymentMethods[0])

watch(selectedPaymentMethod, (selectedPaymentMethod) => {
  if (selectedPaymentMethod.id === 'bank-card') {
   setTimeout(() => {
     window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth'});
   }, 10)
  }
})
</script>

<template>
  <div class="mt-8 pt-8 border-t border-gray-200">
    <RadioGroup v-model="selectedPaymentMethod">
      <RadioGroupLabel class="text-lg font-medium text-gray-900">Select payment method</RadioGroupLabel>

      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        <RadioGroupOption as="template" v-for="paymentMethod in paymentMethods" :key="paymentMethod.id" :value="paymentMethod" v-slot="{ checked, active }">
          <div :class="[checked ? 'border-transparent' : 'border-gray-300', active ? 'ring-2 ring-indigo-500' : '', 'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none']">
                    <span class="flex flex-1">
                      <span class="flex flex-col">
                        <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">{{ paymentMethod.title }}</RadioGroupLabel>
                        <RadioGroupDescription as="span" class="mt-1 flex items-center text-sm text-gray-500">{{ paymentMethod.body }}</RadioGroupDescription>
                      </span>
                    </span>
            <CheckCircleIcon v-if="checked" class="h-5 w-5 text-indigo-600" aria-hidden="true" />
            <span :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']" aria-hidden="true" />
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>

  <BankCardForm v-if="selectedPaymentMethod.id === 'bank-card'" class="mt-8" />

  <button class="mt-8 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          type="submit">
    Proceed to checkout
  </button>
</template>
