<script setup lang="ts">

import DashboardLayout from "@/layouts/DashboardLayout.vue";
import {useTradingAccountStore} from "@/stores/tradingAccount";
import {type Ref, ref} from "vue";
import {PencilSquareIcon} from '@heroicons/vue/20/solid'

const tradingAccountStore = useTradingAccountStore();

const activeEditorId: Ref<number | null> = ref(null)
const newName = ref('')

const startEditing = (id: number) => {
  const targetAccount = tradingAccountStore.tradingAccounts.find(account => account.id === id)
  if (!targetAccount) {
    console.error('trading account not found in the list, id: ' + id)
    return
  }

  newName.value = targetAccount.display_name || ''

  activeEditorId.value = id
}

const resetEditor = () => {
  newName.value = ''
  activeEditorId.value = null
}

const saveDisplayName = async (event: Event) => {
  event.preventDefault()

  if (!activeEditorId.value) {
    console.error('You cannot save new display name because activeEditorId is null')
    return
  }

  tradingAccountStore.setName(activeEditorId.value, newName.value || '')

  resetEditor()
}
</script>

<template>
  <DashboardLayout>
    <div class="shadow bg-white px-4 py-5 sm:px-6 rounded-lg">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900 pl-4">My Accounts</h1>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button type="button"
                  class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Create a new account
          </button>
        </div>
      </div>
      <div class="-mx-4 mt-6 sm:-mx-0">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
            <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
              Type
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
            <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
              Number
            </th>
            <th scope="col"
                class="hidden py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:table-cell">Size
            </th>
            <th scope="col"
                class="hidden py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:table-cell">Equity
            </th>
            <th scope="col"
                class="hidden py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:table-cell">Start Date
            </th>
            <th scope="col"
                class="hidden py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:table-cell">End Date
            </th>
            <th scope="col" class="relative py-3.5 pl-8 pr-4 sm:pr-0">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="account in tradingAccountStore.tradingAccounts" :key="account.id">
            <td class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none flex items-center">
              <template v-if="activeEditorId !== account.id">
                {{ account.display_name || 'Unnamed #' + account.login }}
                <button @click="startEditing(account.id)" class="w-4 ml-3">
                  <PencilSquareIcon/>
                </button>
              </template>
              <form v-else @submit="saveDisplayName" @reset="resetEditor" class="flex gap-4">
                <input v-model="newName"
                       required
                       autofocus
                       placeholder="Rocket to the moon"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <button type="reset" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button type="submit"
                        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Save
                </button>
              </form>
              <dl class="font-normal lg:hidden">
                <dd class="mt-1 truncate text-gray-700">{{ 'Gold' }}</dd>
                <dd class="mt-1 truncate text-gray-500 sm:hidden">{{ 'Equity: $10,000' }}</dd>
                <dd class="mt-1 truncate text-gray-500 sm:hidden">{{ 'Start Date: yesterday' }}</dd>
              </dl>
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{{ 'Gold' }}</td>
            <td class="px-3 py-4 text-sm text-gray-500">
              <span class="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Active</span>
            </td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{{ account.sabio_user_id }}</td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{{ '10 000' }}</td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{{ '$10,000' }}</td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{{ 'today' }}</td>
            <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{{ '-' }}</td>
            <td class="py-4 pl-8 pr-4 text-right text-sm font-medium">
              <RouterLink :to="'/traderoom/' + account.id" class="text-indigo-600 hover:text-indigo-900">Open
                Traderoom
              </RouterLink>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>

</style>
