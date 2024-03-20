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

  const paymentMethods = (data.value as PaymentMethodWithSupportedCountries[]).filter((paymentMethod) => {
    return paymentMethod.countries.includes(<string>countryCode.value)
  })

  let result: PaymentMethodWithSupportedCountries[] = []

  paymentMethods.forEach((paymentMethod) => {
    const keys = paymentMethod.key.split('_');
    keys.forEach(key => {
      result.push({
        ...paymentMethod,
        key,
      })
    })
  })

  return result
})

watch(paymentMethods, () => {
  const isSelectedExistInUpdatedList = paymentMethods.value.findIndex((item) => item.key === checkoutStore.selectedPaymentMethod?.key) != -1

  if (!checkoutStore.selectedPaymentMethod || !isSelectedExistInUpdatedList) {
    checkoutStore.selectedPaymentMethod = paymentMethods.value[0]
  }
})

watch(() => checkoutStore.selectedPaymentMethod, (selectedPaymentMethod, oldValue) => {
  if (selectedPaymentMethod?.key === 'bank-card' && oldValue) {
   setTimeout(() => {
     window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth'});
   }, 10)
  }
})

const getColSpanClass = (idx: number) => {
  idx++

  const skipped = paymentMethods.value.length - (paymentMethods.value.length % 3)
  const countItemsOnLastRow = paymentMethods.value.length - skipped

  const position = idx % 3

  if (countItemsOnLastRow < 1 || idx <= skipped) {
    return '';
  }

  if (countItemsOnLastRow === 1) {
    return 'col-span-3';
  }

  if (countItemsOnLastRow === 2) {
    return 'col-span-' + (position === 1 ? 1 : 2);
  }

  return '';
}
</script>

<template>
  <div class="mt-8 pt-8 border-t border-gray-200">
    <RadioGroup v-model="checkoutStore.selectedPaymentMethod" by="key">
      <RadioGroupLabel class="text-lg font-medium text-white">Choose payment method</RadioGroupLabel>

      <div v-if="!isFetching && !error && paymentMethods" class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        <RadioGroupOption as="template" v-for="(paymentMethod, idx) in paymentMethods" :key="paymentMethod.key" :value="paymentMethod" v-slot="{ checked, active }">
          <div :class="[checked ? 'border-transparent' : 'border-gray-300', active ? 'ring-2 ring-indigo-500' : '', getColSpanClass(idx), 'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none']">
              <span class="flex flex-1">
                <span class="flex flex-col">
                  <RadioGroupLabel as="span" class="block text-sm font-medium text-white">{{ $t('payment_methods.' + paymentMethod.key + '.title') }}</RadioGroupLabel>
                  <RadioGroupDescription as="span" class="mt-1 flex items-center text-sm text-gray-500">{{ $t('payment_methods.' + paymentMethod.key + '.body') }}</RadioGroupDescription>
                </span>
              </span>
            <CheckCircleIcon v-if="checked" class="h-5 w-5 text-indigo-600" aria-hidden="true" />
            <span :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']" aria-hidden="true" />
          </div>
        </RadioGroupOption>
      </div>

      <div v-if="!isFetching && !error && paymentMethods.length === 0" class="text-center border-2 border-dashed border-gray-300 p-12 rounded-lg">
        <h3 class="mt-2 text-sm font-semibold text-red-500">No available payment methods for selected country</h3>
      </div>
    </RadioGroup>
  </div>

  <BankCardForm v-if="checkoutStore.selectedPaymentMethod?.key === 'bank-card'" class="mt-8" />

</template>
