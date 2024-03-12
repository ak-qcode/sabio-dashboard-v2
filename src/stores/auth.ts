import {ref} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";
import {useTradingAccountStore} from "@/stores/tradingAccount";

interface Customer {
  id: bigint
  email: string
  notificationQty: number
  fullName: string
  firstName: string
  lastName: string
}

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const isLoading = ref(false)

  const customer = ref(null as Customer | null);

  const tradingAccountStore = useTradingAccountStore()

  async function fetchCustomerInfo() {
    isLoading.value = true

    try {
      const response = await axios.get('/customers/current');
      const data = response.data

      isLoggedIn.value = true

      customer.value = {
        id: data.id,
        email: data.email,
        notificationQty: data.notificationQty,
        fullName: data.first_name + ' ' + data.last_name,
        firstName: data.first_name,
        lastName: data.last_name,
      }

      tradingAccountStore.setList(data.tradingAccounts)
    } catch (error) {
      return
    } finally {
      isLoading.value = false
    }
  }

  function logOut() {
    axios.delete('/logout')
        .then(reset)

    // TODO: redirect to login page
  }

  function reset() {
    customer.value = null
    isLoggedIn.value = false
    isLoading.value = false
  }

  return {isLoggedIn, isLoading, customer, fetchCustomerInfo, logOut, reset}
})
