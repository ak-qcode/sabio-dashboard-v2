<script setup lang="ts">

import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import {ChevronDownIcon, MagnifyingGlassIcon} from "@heroicons/vue/20/solid";
import {Bars3Icon} from "@heroicons/vue/24/outline";
import {useAuthStore} from "@/stores/auth";
import BellIcon from '@/components/ui/icons/BellIcon.vue'
import ChevronDown from '@/components/ui/icons/ChevronDown.vue'
import {useTradingAccountStore} from "@/stores/tradingAccount";
import { ref, onMounted } from 'vue';

const sidebarOpen = defineModel();

const authStore = useAuthStore();

const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#', onClick: authStore.logOut },
]
defineProps([
    'navigation',
])

const tradingAccountStore = useTradingAccountStore();

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectAccount = (account) => {
  tradingAccountStore.currentAccount = account;
  isOpen.value = false;
};

onMounted(() => {
  if (tradingAccountStore.tradingAccounts.length > 0 && !tradingAccountStore.currentAccount) {
    tradingAccountStore.currentAccount = tradingAccountStore.tradingAccounts[0];
  }
});


</script>

<template>
    <div class=" flex w-full h-14 shrink-0 items-center gap-x-4 bg-black px-3 shadow-sm sm:gap-x-6">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
            <span class="sr-only">Open sidebar</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- Separator -->
        <div class="h-6 w-px lg:hidden" aria-hidden="true"></div>

        <div class="flex flex-1 gap-x-4 justify-between lg:gap-x-6">
            <!-- <form class="relative flex flex-1" action="#" method="GET">
                <label for="search-field" class="sr-only">Search</label>
                <MagnifyingGlassIcon class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-dop-color" aria-hidden="true" />
                <input id="search-field" class="block bg-black h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Search..." type="search" name="search" />
            </form> -->
            <div class="flex shrink-0 items-center">
                <a href="https://sabiotrade.com/" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.135512 13.8C0.0462617 13.2129 0 12.6118 0 12C0 5.37258 5.42914 0 12.1263 0C16.8607 0 20.9614 2.68491 22.9584 6.6H18.6286C17.0715 4.76583 14.7365 3.6 12.1263 3.6C8.06265 3.6 4.66592 6.42578 3.83324 10.2H24.1171C24.2064 10.7871 24.2526 11.3882 24.2526 12C24.2526 18.6274 18.8235 24 12.1263 24C7.38392 24 3.27736 21.306 1.28413 17.3801L5.55214 17.3142C6.74213 18.7541 8.40563 19.7958 10.3074 20.2067V13.8H0.135512ZM13.9453 20.2067C17.1733 19.5093 19.7147 16.9943 20.4194 13.8H13.9453V20.2067Z" fill="white"/>
                    </svg>
                </a>
                
            </div>
            <div class="relative min-w-40">
                <button @click="toggleDropdown" class="text-dop-color border border-white-opacity-color group flex gap-x-3 items-center rounded-md p-2 text-sm font-semibold  hover:bg-indigo-700">
                <span>{{ tradingAccountStore.currentAccount ? (tradingAccountStore.currentAccount.display_name || 'Unnamed # — ' + tradingAccountStore.currentAccount.login) : 'Select Account' }}</span>
                <ChevronDown :class="{'svg-rotate': isOpen}"/>
                </button>
                <ul v-if="isOpen" class="space-y-1 text-dop-color shadow-md border border-white-opacity-color rounded-md absolute w-full z-10 bg-black" role="list">
                    <li v-for="account in tradingAccountStore.tradingAccounts" :key="account.id">
                        <button
                        :class="[tradingAccountStore.currentAccount?.accountId === account.id ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full']"
                        @click="selectAccount(account)"
                        >
                        <span class="truncate">{{ account.display_name || 'Unnamed # — ' + account.login }}</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div class="flex items-center">
                <button type="button" class="p-2 bg-grey-color hover:text-gray-500 border border-white border-opacity-5 rounded-md">
                    <span class="sr-only">View notifications</span>
                    <BellIcon class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
