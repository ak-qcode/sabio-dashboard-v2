import type {Ref} from 'vue'
import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {Plan} from "@/api/types";
import {formatMoney} from "@/utils/numberFormatter";

export const useCheckoutStore = defineStore('checkout', () => {
  const plans: Ref<Plan[]> = ref([])

  plans.value = [
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

  const selectedPlan: Ref<Plan> = ref(plans.value[2])

  return { plans, selectedPlan }
})
