<script setup lang="ts">

import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import {ChevronDownIcon, MagnifyingGlassIcon} from "@heroicons/vue/20/solid";
import {Bars3Icon} from "@heroicons/vue/24/outline";
import {useAuthStore} from "@/stores/auth";
import BellIcon from '@/components/ui/icons/BellIcon.vue'
import QuestionIcon from '@/components/ui/icons/QuestionIcon.vue'
import ChevronDown from '@/components/ui/icons/ChevronDown.vue'
import {useTradingAccountStore} from "@/stores/tradingAccount";

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

</script>

<template>
    <div class="z-60 flex w-full h-14 shrink-0 items-center gap-x-4 px-3 shadow-sm sm:gap-x-6">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
            <span class="sr-only">Open sidebar</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- Separator -->
        <div class="h-6 w-px lg:hidden" aria-hidden="true" />

        <div class="flex flex-1 gap-x-4 justify-between lg:gap-x-6">
            
            <div class="flex items-center">

                <!-- Separator -->
                <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                <!-- Profile dropdown -->
                <Menu as="div" class="relative">
                    <MenuButton class="-m-1.5 flex items-center p-1.5">
                        <span class="sr-only">Open user menu</span>
                        <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        <span class="hidden lg:flex lg:items-center">
                  <span aria-hidden="true"
                        class="ml-4 text-sm font-semibold leading-6 text-white">{{ authStore.customer?.fullName || 'Loading ...' }}</span>
                  <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
                    </MenuButton>
                    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                        <MenuItems class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }" @click="item.onClick">
                                <a :href="item.href" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">{{ item.name }}</a>
                            </MenuItem>
                        </MenuItems>
                    </transition>
                </Menu>
            </div>
            <div class="flex shrink-0 justify-center items-center border border-white border-opacity-10 rounded-md w-10 h-10">
                <QuestionIcon />
            </div>
           
        </div>
    </div>
</template>

<style scoped>

</style>
