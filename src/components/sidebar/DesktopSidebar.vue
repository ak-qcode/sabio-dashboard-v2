<script setup lang="ts">

import {Cog6ToothIcon} from "@heroicons/vue/24/outline";
import {useTradingAccountStore} from "@/stores/tradingAccount";

defineProps([
    'navigation',
    'teams',
])

const tradingAccountStore = useTradingAccountStore();
</script>

<template>
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
            <div class="flex h-16 shrink-0 items-center">
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company" />
            </div>
            <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" class="-mx-2 space-y-1">
                            <li v-for="item in navigation" :key="item.name">
                                <RouterLink :to="item.href" class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                                    <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                                    {{ item.name }}
                                </RouterLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div class="text-xs font-semibold leading-6 text-indigo-200">Your trading accounts</div>
                        <ul role="list" class="-mx-2 mt-2 space-y-1">
                            <li v-for="account in tradingAccountStore.tradingAccounts" :key="account.accountId">
                                <button
                                    :class="[tradingAccountStore.currentAccount?.accountId === account.accountId ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full']"
                                    @click="tradingAccountStore.selectAccount(account.accountId)"
                                >
                                    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">{{ account.accountId }}</span>
                                    <span class="truncate">{{ account.login }}</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                    <li class="mt-auto">
                        <a href="#" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white">
                            <Cog6ToothIcon class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" aria-hidden="true" />
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
