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
        <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 pt-16">
          
            <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" class="-mx-2 space-y-1">
                            <li v-for="item in navigation" :key="item.name" class="cursor-pointer">
                                <RouterLink :to="item.href" class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 text-dop-color hover:text-white active:text-white">
                                    <component :is="item.icon" class="h-6 w-6 shrink-0 group-hover:hidden group-active:hidden" aria-hidden="true" />
                                    <component :is="item.hoveredIcon" class="h-6 w-6 shrink-0 hidden group-hover:flex group-active:flex" aria-hidden="true" />

                                    {{ item.name }}
                                </RouterLink>
                            </li>

                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
