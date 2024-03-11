<script lang="ts" setup>
import {ref} from "vue";

const specs = [
  {
    key: "Account balance",
    value: "$100,000",
  },
  {
    key: "Leverage",
    value: "30:1",
  },
  {
    key: "Daily Loss Limit",
    value: "$25,000",
  },
  {
    key: "Max Trading Drawdown",
    value: "6%",
  },
  {
    key: "Profit payout",
    value: "80%",
  },
]

const discountCode = ref('')
const couponApplied = ref(false)

const applyCoupon = (e: Event) => {
  e.preventDefault()

  alert(discountCode.value)

  if (true) {
    couponApplied.value = true
  }
}

</script>

<template>
  <div>
    <h2 class="text-md font-medium text-gray-900">What you will get</h2>

    <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
      <dl class="space-y-6 px-4 py-6 sm:px-6">
        <div v-for="spec in specs" :key="spec.key" class="flex items-center justify-between">
          <dt :class="[spec.key === 'Account balance' ? 'text-lg font-semibold' : 'text-sm']">{{ spec.key }}</dt>
          <dd :class="['text-gray-900', spec.key === 'Account balance' ? 'text-lg font-semibold' : 'text-sm font-medium']">
            {{ spec.value }}
          </dd>
        </div>
      </dl>

      <dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
        <form @submit="applyCoupon">
          <label class="block text-sm font-medium text-gray-700" for="discount-code">Discount code</label>
          <div class="mt-1 flex space-x-4">
            <input id="discount-code"
                   v-model="discountCode"
                   :disabled="couponApplied"
                   class="block w-full rounded-md border-gray-300 disabled:bg-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                   type="text"/>
            <button class="rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    type="submit">
              Apply
            </button>
          </div>
        </form>

        <div class="flex items-center justify-between">
          <dt class="text-sm">Original price</dt>
          <dd class="text-sm font-medium text-gray-900">$64.00</dd>
        </div>
        <div v-if="couponApplied" class="flex items-center justify-between">
          <dt class="text-sm flex">
            Discount <span class="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">{{
              discountCode
            }}</span>
          </dt>
          <dd class="text-sm font-medium text-gray-900">- $15.00</dd>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 pt-6">
          <dt class="text-base font-medium">You will pay</dt>
          <dd class="text-base font-medium text-gray-900">$75.52</dd>
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
