<template>
    <div>
        <MobileSidebar v-model="sidebarOpen" :navigation />

        <DesktopSidebar :navigation />

        <div class="lg:pl-72">
            <Header v-model="sidebarOpen" />

            <main class="py-10">
                <div class="px-4 sm:px-6 lg:px-8">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'

import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
} from '@heroicons/vue/24/outline'

import MobileSidebar from "@/components/sidebar/MobileSidebar.vue";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar.vue";
import Header from "@/components/sidebar/Header.vue";
import {initFlowbite} from "flowbite";

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Login', href: '/login', icon: HomeIcon },
    { name: 'Team', href: '/team', icon: UsersIcon },
    { name: 'Projects', href: '/projects', icon: FolderIcon },
    { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
    { name: 'Documents', href: '/documents', icon: DocumentDuplicateIcon },
    { name: 'Reports', href: '/reports', icon: ChartPieIcon },
]

const sidebarOpen = ref(false)

onMounted(() => {
  initFlowbite();
})
</script>
