<script setup lang="ts">

import {Cog6ToothIcon} from "@heroicons/vue/24/outline";
import {useTradingAccountStore} from "@/stores/tradingAccount";
import LanguageSelector from "@/components/ui/LanguageSelector.vue";

defineProps([
    'navigation',
])

const tradingAccountStore = useTradingAccountStore();
</script>

<template>
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-50 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 pt-16">
            <!-- <div class="flex h-16 shrink-0 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.135512 13.8C0.0462617 13.2129 0 12.6118 0 12C0 5.37258 5.42914 0 12.1263 0C16.8607 0 20.9614 2.68491 22.9584 6.6H18.6286C17.0715 4.76583 14.7365 3.6 12.1263 3.6C8.06265 3.6 4.66592 6.42578 3.83324 10.2H24.1171C24.2064 10.7871 24.2526 11.3882 24.2526 12C24.2526 18.6274 18.8235 24 12.1263 24C7.38392 24 3.27736 21.306 1.28413 17.3801L5.55214 17.3142C6.74213 18.7541 8.40563 19.7958 10.3074 20.2067V13.8H0.135512ZM13.9453 20.2067C17.1733 19.5093 19.7147 16.9943 20.4194 13.8H13.9453V20.2067Z" fill="white"/>
                </svg>
            </div> -->
            <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" class="-mx-2 space-y-1">
                            <li v-for="item in navigation" :key="item.name">
                                <RouterLink :to="item.href" class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 text-dop-color hover:text-white active:text-white">
                                    <component :is="item.icon" class="h-6 w-6 shrink-0 " aria-hidden="true" />
                                    {{ item.name }}
                                </RouterLink>
                            </li>
                        </ul>
                    </li>
                    <!-- <li>
                        <div class="text-xs font-semibold leading-6 text-indigo-200">Your trading accounts</div>
                        <ul role="list" class="-mx-2 mt-2 space-y-1">
                            <li v-for="account in tradingAccountStore.tradingAccounts" :key="account.id">
                                <button
                                    :class="[tradingAccountStore.currentAccount?.id === account.id ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full']"
                                    @click="tradingAccountStore.selectAccount(account.id)"
                                >
                                    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">{{ account.id }}</span>
                                    <span class="truncate">{{ account.display_name || 'Unnamed #' + account.login }}</span>
                                </button>
                            </li>
                        </ul>
                    </li> -->
                    <!-- <li class="mt-auto">
                      <LanguageSelector :isSidebar="true" />
                    </li>
                    <li>
                        <a href="#" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-dop-color hover:bg-indigo-700 hover:text-white">
                            <Cog6ToothIcon class="h-6 w-6 shrink-0 text-dop-color group-hover:text-white" aria-hidden="true" />
                            Settings
                        </a>
                    </li> -->
                </ul>
            </nav>
        </div>
    </div>
</template>
