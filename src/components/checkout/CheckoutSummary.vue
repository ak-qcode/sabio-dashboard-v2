<script lang="ts" setup>
import {ref, watch} from "vue";
import axios from "axios";
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import {formatMoney} from "@/utils/numberFormatter";
import type {Plan} from "@/api/types";

const selectedPlan = defineModel('selectedPlan')

const originalOrderAmount = ref(150) // FIXME
const orderAmount = ref(150) // FIXME

const discountCode = ref('')
const discountAmount = ref(0)
const couponApplying = ref(false)
const couponApplied = ref(false)
const couponError = ref('')

watch(discountCode, () => {
  couponError.value = ''
})

const applyCoupon = (e: Event) => {
  e.preventDefault()

  if (!discountCode.value) {
    console.error("Discount code field is empty")
  }

  couponError.value = ''
  couponApplying.value = true

  axios.get('/coupon/check', {
    params: {
      coupon: discountCode.value,
      product_id: 1,
    }
  })
    .then(res => res.data)
    .then(data => {
      couponApplied.value = true;

      const percent = data.percent
      if (percent < 1 || percent > 100) {
        console.error('coupon percent is invalid')

        return
      }

      discountAmount.value = orderAmount.value * (percent / 100);
      orderAmount.value = orderAmount.value - discountAmount.value
      // TODO: new price and discount amount show
    })
    .catch(err => {
      couponError.value = err?.response?.data?.error?.coupon || err.message
    }).finally(() => {
    couponApplying.value = false
  })
}

</script>

<template>
  <div>
    <h2 class="text-md font-semibold text-gray-900">What you will get</h2>

    <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
      <dl class="space-y-6 px-4 py-6 sm:px-6">
        <div v-for="spec in (selectedPlan as Plan).specs" :key="spec.key" class="flex items-center justify-between">
          <dt :class="[spec.key === 'Account balance' ? 'text-lg font-semibold' : 'text-sm']">{{ spec.key }}</dt>
          <dd :class="['text-gray-900', spec.key === 'Account balance' ? 'text-lg font-semibold' : 'text-sm font-medium']">
            {{ spec.value }}
          </dd>
        </div>
      </dl>

      <dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
        <form @submit="applyCoupon">
          <label class="block text-sm font-medium text-gray-700" for="discount-code">Discount code</label>
          <div class="mt-3 flex space-x-4">
            <div class="relative w-full">
              <input id="discount-code"
                     v-model="discountCode"
                     required
                     :disabled="couponApplied"
                     class="block w-full rounded-md border-gray-300 disabled:bg-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                     type="text"/>
              <div v-if="couponError" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            </div>
            <button class="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    type="submit">
              Apply
            </button>
          </div>
          <p v-if="couponApplying" class="mt-2 text-sm text-gray-600">Looking for your coupon ... Please wait</p>
          <p v-if="couponError" class="mt-2 text-sm text-red-600">{{ couponError }}</p>
        </form>

        <div v-if="couponApplied" class="flex items-center justify-between">
          <dt class="text-sm">Original price</dt>
          <dd class="text-sm font-medium text-gray-900">{{ formatMoney(originalOrderAmount) }}</dd>
        </div>
        <div v-if="couponApplied" class="flex items-center justify-between">
          <dt class="text-sm flex">
            Discount <span class="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">{{
              discountCode
            }}</span>
          </dt>
          <dd class="text-sm font-medium text-gray-900">-{{ formatMoney(discountAmount) }}</dd>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 pt-6">
          <dt class="text-base font-medium">You will pay</dt>
          <dd class="text-base font-medium text-gray-900">{{ formatMoney(orderAmount) }}</dd>
        </div>
      </dl>

      <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
        <button class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                type="submit">
          Proceed to checkout
        </button>
      </div>
    </div>
  </div>
</template>