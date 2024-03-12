<script lang="ts" setup>

import DashboardLayout from "@/layouts/DashboardLayout.vue";
import Plans from "@/components/checkout/Plans.vue";
import BillingDetails from "@/components/checkout/BillingDetails.vue";
import CheckoutSummary from "@/components/checkout/CheckoutSummary.vue";
import PaymentMethods from "@/components/checkout/PaymentMethods.vue";
import {ref} from "vue";
import {formatMoney} from "@/utils/numberFormatter";
import type {Plan} from "@/api/types";

let plans: Plan[] = [
  {
    id: 1,
    name: "Standart",
    initialBalance: 10000,
    price: 250,
    specs: [
      {
        key: "Leverage",
        value: "40:1",
      },
      {
        key: "Daily Loss Limit",
        value: formatMoney(2500),
      },
      {
        key: "Max Trading Drawdown",
        value: "6%",
      },
      {
        key: "Profit payout",
        value: "80%",
      },
    ],
  },
  {
    id: 2,
    name: "Premium",
    initialBalance: 50000,
    price: 500,
    specs: [
      {
        key: "Leverage",
        value: "30:1",
      },
      {
        key: "Daily Loss Limit",
        value: formatMoney(15000),
      },
      {
        key: "Max Trading Drawdown",
        value: "6%",
      },
      {
        key: "Profit payout",
        value: "80%",
      },
    ],
  },
  {
    id: 3,
    name: "Gold",
    initialBalance: 100000,
    price: 750,
    specs: [
      {
        key: "Leverage",
        value: "20:1",
      },
      {
        key: "Daily Loss Limit",
        value: formatMoney(20000),
      },
      {
        key: "Max Trading Drawdown",
        value: "6%",
      },
      {
        key: "Profit payout",
        value: "80%",
      },
    ],
  },
  {
    id: 4,
    name: "Platinum",
    initialBalance: 200000,
    price: 1000,
    specs: [
      {
        key: "Leverage",
        value: "10:1",
      },
      {
        key: "Daily Loss Limit",
        value: formatMoney(25000),
      },
      {
        key: "Max Trading Drawdown",
        value: "6%",
      },
      {
        key: "Profit payout",
        value: "80%",
      },
    ],
  },
]

plans = plans.map((plan: Plan): Plan => {
  if (typeof plan.initialBalance === "string") {
    return plan;
  }

  return {
    ...plan,
    initialBalance: formatMoney(plan.initialBalance),
    specs: [
      {
        key: "Account balance",
        value: formatMoney(plan.initialBalance),
      },
      ...plan.specs,
    ],
  }
})

const selectedPlan = ref(plans[2])
</script>

<template>
  <DashboardLayout>
    <div class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
      <div class="md:max-w-[679px]">
        <Plans class="border-b border-gray-900/10 pb-8" :plans :selected="selectedPlan"/>
        <BillingDetails class="mt-8"/>
        <PaymentMethods/>
      </div>
      <div class="md:max-w-[679px]">
        <CheckoutSummary v-model:selected-plan="selectedPlan"/>
      </div>
    </div>
  </DashboardLayout>
</template>
