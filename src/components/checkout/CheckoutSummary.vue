<script lang="ts" setup>
import {computed, ref, unref, watch} from "vue";
import axios from "axios";
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import {formatMoney} from "@/utils/numberFormatter";
import {useCheckoutStore} from "@/stores/checkout";
import Button from '@/components/ui/Button/Button.vue';

const checkoutStore = useCheckoutStore()

const originalOrderAmount = computed(() => checkoutStore.selectedPlan.price)
const orderAmount = computed(() => originalOrderAmount.value - discountAmount.value)

const discountCode = ref('')
const discountPercent = ref(0) // TODO: how I check availability coupon for product if selectedPlan has changed?
const discountAmount = computed(() => {
  if (discountPercent) {
    return originalOrderAmount.value * (discountPercent.value / 100)
  }

  return 0;
})
const couponApplying = ref(false)
const couponApplied = ref(false)
const couponError = ref('')

const resetCouponState = () => {
  couponError.value = ''
  couponApplied.value = false
  couponApplying.value = false
}

watch(discountCode, resetCouponState)

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

      discountPercent.value = percent;
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

    <div class="mt-4 rounded-xl shadow-sm backdrop-blur-sm bg-white/5">
      <dl class="space-y-6 px-4 py-6 sm:px-6">
        <h3 class="text-lg font-semibold text-white">What you will get</h3>

        <div class="flex items-center justify-between border-t border-gray-200">
          <dt class="text-lg font-medium text-white">Account balance</dt>
          <dd class="text-white text-lg font-semibold">
            {{ formatMoney(unref(checkoutStore.selectedPlan.initialBalance)) }}
          </dd>
        </div>
        <div v-for="spec in checkoutStore.selectedPlan.specs" :key="spec.key" class="flex items-center justify-between">
          <dt class="text-sm text-dop-color">{{ spec.key }}</dt>
          <dd class="text-dop-color text-sm font-medium">
            {{ spec.value }}
          </dd>
        </div>
      </dl>

      <dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
        <form @submit="applyCoupon" @reset="resetCouponState">
          <label class="block text-sm font-medium text-white" for="discount-code">Coupon Code</label>
          <div class="mt-3 flex space-x-4">
            <div class="relative w-full ">
              <input id="discount-code"
                     v-model="discountCode"
                     required
                     :disabled="couponApplied"
                     class="block w-full rounded-md border-gray-300 disabled:bg-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm backdrop-blur-sm bg-white/5"
                     type="text"/>
              <div v-if="couponError" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
            </div>
            <button v-if="!couponApplied" class="rounded-md backdrop-blur-sm bg-white/ px-4 text-sm font-medium text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    type="submit">
              Apply
            </button>
            <button v-if="couponApplied" class="rounded-md bg-red-200 px-4 text-sm font-medium text-red-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    type="reset">
              Reset
            </button>
          </div>
          <p v-if="couponApplying" class="mt-2 text-sm text-gray-600">Looking for your coupon ... Please wait</p>
          <p v-if="couponError" class="mt-2 text-sm text-red-600">{{ couponError }}</p>
        </form>

        <div v-if="couponApplied" class="flex items-center justify-between">
          <dt class="text-sm">Original price</dt>
          <dd class="text-sm font-medium text-dop-color">{{ formatMoney(originalOrderAmount) }}</dd>
        </div>
        <div v-if="couponApplied" class="flex items-center justify-between">
          <dt class="text-sm flex">
            Discount <span class="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">{{
              discountCode
            }}</span>
          </dt>
          <dd class="text-sm font-medium text-dop-color">-{{ formatMoney(discountAmount) }}</dd>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 pt-6">
          <dt class="text-xl text-white font-medium">You will pay</dt>
          <dd class="text-xl text-white font-medium">{{ formatMoney(orderAmount) }}</dd>
        </div>
        <div class="flex justify-center">
          <Button class="mt-5" type="submit" :disabled="!checkoutStore.ready">Proceed to Checkout</Button>
        </div>

      </dl>


    </div>
  </div>
</template>
