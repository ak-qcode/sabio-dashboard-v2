<script setup lang="ts">
import {computed, type ComputedRef, type Ref, ref, watch} from 'vue'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import BankCardForm from "@/components/checkout/BankCardForm.vue";
import useFetch from "@/api/useFetch";
import type {PaymentMethodWithSupportedCountries} from "@/api/types";
import {useAuthStore} from "@/stores/auth";
import {useCheckoutStore} from "@/stores/checkout";

const authStore = useAuthStore()
const checkoutStore = useCheckoutStore()

const {isFetching, error, data } = useFetch('/payment-methods').get().json()

const countryCode: ComputedRef<string | undefined> = computed(() => checkoutStore.countryCode || authStore.customer?.country?.code)

const paymentMethods: ComputedRef<PaymentMethodWithSupportedCountries[]> = computed(() => {
  if (!data.value || !countryCode.value) {
    return []
  }

  return (data.value as PaymentMethodWithSupportedCountries[]).filter((paymentMethod) => {
    return paymentMethod.countries.includes(<string>countryCode.value)
  })
})

const selectedPaymentMethod: Ref<PaymentMethodWithSupportedCountries | null> = ref(null)

watch(paymentMethods, () => {
  const isSelectedExistInUpdatedList = paymentMethods.value.findIndex((item) => item.key === selectedPaymentMethod.value?.key) != -1

  if (!selectedPaymentMethod.value || !isSelectedExistInUpdatedList) {
    selectedPaymentMethod.value = paymentMethods.value[0]
  }
})

watch(selectedPaymentMethod, (selectedPaymentMethod, oldValue) => {
  if (selectedPaymentMethod?.key === 'bank-card' && oldValue) {
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
        <RadioGroupOption v-if="!isFetching && !error" as="template" v-for="paymentMethod in paymentMethods" :key="paymentMethod.key" :value="paymentMethod" v-slot="{ checked, active }">
          <div :class="[checked ? 'border-transparent' : 'border-gray-300', active ? 'ring-2 ring-indigo-500' : '', 'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none']">
              <span class="flex flex-1">
                <span class="flex flex-col">
                  <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">{{ $t('payment_methods.' + paymentMethod.key + '.title') }}</RadioGroupLabel>
                  <RadioGroupDescription as="span" class="mt-1 flex items-center text-sm text-gray-500">{{ $t('payment_methods.' + paymentMethod.key + '.body') }}</RadioGroupDescription>
                </span>
              </span>
            <CheckCircleIcon v-if="checked" class="h-5 w-5 text-indigo-600" aria-hidden="true" />
            <span :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']" aria-hidden="true" />
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>

  <BankCardForm v-if="selectedPaymentMethod?.key === 'bank-card'" class="mt-8" />

  <button class="mt-8 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          type="submit">
    Proceed to checkout
  </button>
</template>
