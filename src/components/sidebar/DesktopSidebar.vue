<script setup lang="ts">

import {Cog6ToothIcon} from "@heroicons/vue/24/outline";
import {useTradingAccountStore} from "@/stores/tradingAccount";
import LanguageSelector from "@/components/ui/LanguageSelector.vue";
import ChevronDown from '@/components/ui/icons/ChevronDown.vue'
import { ref } from 'vue';
import { isSidebarCollapsed } from '@/stores/sidebarState';

const emit = defineEmits(['toggle']);

const handleClick = () => {
  emit('toggle');
};

const props = defineProps({
  navigation: Array,
  isSidebarCollapsed: Boolean,
});


const tradingAccountStore = useTradingAccountStore();

</script>

<template>
    <!-- Static sidebar for desktop -->
    <div :class="isSidebarCollapsed ? 'w-20' : 'w-72'" class="hidden lg:fixed lg:inset-y-50 lg:z-50 lg:flex lg:flex-col transition-all duration-300">

        <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 pt-16">
            <button class="border w-6 h-6 flex items-center justify-center text-white rounded-md" type="button" @click="handleClick">
                <ChevronDown />
            </button>

            <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" class="-mx-3 space-y-1">
                            <li v-for="item in navigation" :key="item.name" class="cursor-pointer">
                                <RouterLink :to="item.href" custom v-slot="{ isActive, isExactActive, navigate }">
                                    <div 
                                        class="group flex gap-x-3 rounded-md p-3 text-sm leading-6 text-dop-color hover:text-white"
                                        :class="[!isSidebarCollapsed ? 'text-dop-color hover:text-white' : 'text-white', isActive || isExactActive ? 'text-white' : 'hover:text-white']"
                                        @click="navigate">
                                        <component :is="isActive || isExactActive ? item.activeIcon : item.icon" class="h-6 w-6 shrink-0 group-hover:scale-110 transition-all duration-300" aria-hidden="true" />
                                        <span v-show="!isSidebarCollapsed" class="truncate  ">{{ item.name }}</span>
                                    </div>
                                </RouterLink>
                            </li>

                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
