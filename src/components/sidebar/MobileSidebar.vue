<script setup lang="ts">

import {Dialog, DialogPanel, TransitionChild, TransitionRoot} from "@headlessui/vue";
import {Cog6ToothIcon, XMarkIcon} from "@heroicons/vue/24/outline";
import {useTradingAccountStore} from "@/stores/tradingAccount";
import type {ModelRef} from "@vue/runtime-core";

const sidebarOpen: ModelRef<boolean | undefined> = defineModel();

defineProps([
    'navigation',
])

const tradingAccountStore = useTradingAccountStore();
</script>

<template>
    <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div class="fixed inset-0 flex">
                <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
                    <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                        <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                            <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                                    <span class="sr-only">Close sidebar</span>
                                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </TransitionChild>
                        <!-- Sidebar component, swap this element with another sidebar if you like -->
                        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-dark-blue-color px-6 pb-4">
                            <div class="flex h-16 shrink-0 items-center">
                                <a href="https://sabiotrade.com/" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.135512 13.8C0.0462617 13.2129 0 12.6118 0 12C0 5.37258 5.42914 0 12.1263 0C16.8607 0 20.9614 2.68491 22.9584 6.6H18.6286C17.0715 4.76583 14.7365 3.6 12.1263 3.6C8.06265 3.6 4.66592 6.42578 3.83324 10.2H24.1171C24.2064 10.7871 24.2526 11.3882 24.2526 12C24.2526 18.6274 18.8235 24 12.1263 24C7.38392 24 3.27736 21.306 1.28413 17.3801L5.55214 17.3142C6.74213 18.7541 8.40563 19.7958 10.3074 20.2067V13.8H0.135512ZM13.9453 20.2067C17.1733 19.5093 19.7147 16.9943 20.4194 13.8H13.9453V20.2067Z" fill="white"/>
                                    </svg>
                                </a>                            </div>
                            <nav class="flex flex-1 flex-col">
                                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul role="list" class="-mx-2 space-y-1">
                                            <li v-for="item in navigation" :key="item.name">
                                                <RouterLink :to="item.href" :class="[item.current ? 'bg-blue-color text-white' : 'text-dop-color hover:text-white hover:bg-dark-blue-color', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                                                    <component :is="item.icon" :class="[item.current ? 'text-white' : 'text-dop-color group-hover:text-white', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                                                    {{ item.name }}
                                                </RouterLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <!-- <li>
                                        <div class="text-xs font-semibold leading-6 text-dop-color">Your trading accounts</div>
                                        <ul role="list" class="-mx-2 mt-2 space-y-1">
                                            <li v-for="account in tradingAccountStore.tradingAccounts" :key="account.id">
                                                <button
                                                    :class="[tradingAccountStore.currentAccount?.id === account.id ? 'bg-bg-dark-blue-color text-white' : 'text-dop-color hover:text-white hover:bg-bg-dark-blue-color', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full']"
                                                    @click="tradingAccountStore.selectAccount(account.id)"
                                                >
                                                    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">{{ account.id }}</span>
                                                    <span class="truncate">{{ account.display_name || 'Unnamed #' + account.login }}</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </li> -->
                                    <li class="mt-auto">
                                        <a href="#" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-dop-color hover:bg-bg-dark-blue-color hover:text-white">
                                            <Cog6ToothIcon class="h-6 w-6 shrink-0 text-dop-color group-hover:text-white" aria-hidden="true" />
                                            Settings
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

