<script lang="ts" setup>
import {useAuthStore} from "@/stores/auth";
import useFetch from "@/api/useFetch";
import {reactive, watch} from "vue";
import {useCheckoutStore} from "@/stores/checkout";

const authStore = useAuthStore();
const checkoutStore = useCheckoutStore();

const formData = reactive({
  firstName: authStore.customer?.firstName || "",
  lastName: authStore.customer?.lastName || "",
  phoneNumber: "",
  email: authStore.customer?.email || "",
  countryCode: checkoutStore.countryCode || authStore.customer?.country?.code,
  city: "",
  addressLine: "",
  postalCode: "",
})

watch(() => formData.countryCode, () => {
  if (formData.countryCode) {
    checkoutStore.updateCountryCode(formData.countryCode)
  }
})

const {isFetching: isFetchingCountries, error, data: countries} = useFetch('/locations/countries').get().json()

</script>

<template>
  <form @submit="() => {}">
    <h2 class="text-base font-semibold leading-7 text-gray-900">Add billing details</h2>
    <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

    <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div class="sm:col-span-3">
        <label class="block text-sm font-medium leading-6 text-gray-900" for="first-name">First name</label>
        <div class="mt-2">
          <input id="first-name"
                 v-model="formData.firstName"
                 autocomplete="given-name"
                 class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 name="first-name"
                 type="text"/>
        </div>
      </div>

      <div class="sm:col-span-3">
        <label class="block text-sm font-medium leading-6 text-gray-900" for="last-name">Last name</label>
        <div class="mt-2">
          <input id="last-name"
                 v-model="formData.lastName"
                 autocomplete="family-name"
                 class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 name="last-name"
                 type="text"/>
        </div>
      </div>

      <div class="sm:col-span-4">
        <label class="block text-sm font-medium leading-6 text-gray-900" for="email">Email address</label>
        <div class="mt-2">
          <input id="email"
                 v-model="formData.email"
                 autocomplete="email"
                 class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 name="email"
                 type="email"/>
        </div>
      </div>

      <div class="sm:col-span-4">
        <label class="block text-sm font-medium leading-6 text-gray-900" for="countryCode">Country</label>
        <div class="mt-2">
          <select id="countryCode"
                  v-model="formData.countryCode"
                  autocomplete="country-code"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  name="countryCode">
            <option v-for="country in countries" :key="country.code" :value="country.code">{{ country.name }}</option>
          </select>
        </div>
        <p class="text-red-500 text-sm mt-2" v-if="authStore.customer?.country?.code != formData.countryCode">You have changed country field. If you continue, the country will be changed in your profile also</p>
      </div>

      <div class="col-span-full">
        <label class="block text-sm font-medium leading-6 text-gray-900" for="address-line">Address line</label>
        <div class="mt-2">
          <input id="address-line"
                 v-model="formData.addressLine"
                 autocomplete="street-address"
                 class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 name="addressLine"
                 type="text"/>
        </div>
      </div>

      <div class="sm:col-span-4 sm:col-start-1">
        <label class="block text-sm font-medium leading-6 text-gray-900" for="city">City</label>
        <div class="mt-2">
          <input id="city"
                 v-model="formData.city"
                 autocomplete="city"
                 class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 name="city"
                 type="text"/>
        </div>
      </div>

      <div class="sm:col-span-2">
        <label class="block text-sm font-medium leading-6 text-gray-900" for="postal-code">Postal code</label>
        <div class="mt-2">
          <input id="postal-code"
                 v-model="formData.postalCode"
                 autocomplete="postal-code"
                 class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 name="postal-code"
                 type="text"/>
        </div>
      </div>
    </div>
  </form>
</template>
