import {ref} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";
import {useTradingAccountStore} from "@/stores/tradingAccount";

interface Customer {
  id: bigint
  email: string
  notificationQty: number
  name: string
}

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const isLoading = ref(false)

  const customer = ref(null as Customer | null);

  const tradingAccountStore = useTradingAccountStore()

  function fetchCustomerInfo() {
    isLoading.value = true

    try {
      axios.get('/customers/current')
          .then(res => res.data)
          .then(data => {
            isLoggedIn.value = true

            customer.value = {
              id: data.id,
              email: data.email,
              notificationQty: data.notificationQty,
              name: data.name,
            }

            tradingAccountStore.setList(data.tradingAccounts)

            isLoading.value = false
          })
    } catch (e) {
      isLoading.value = false

      throw e
    }
  }

  function logOut() {
    axios.delete('/logout')
        .then(() => {
          customer.value = null
          isLoggedIn.value = false
          isLoading.value = false
        })
  }

  return {isLoggedIn, isLoading, customer, fetchCustomerInfo, logOut}
})
