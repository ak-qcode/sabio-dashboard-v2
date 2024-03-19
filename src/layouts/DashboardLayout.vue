
<template>
  <div class="flex flex-col min-h-screen">
    <header class="sticky top-0 z-50">
      <Header v-model="sidebarOpen" />
    </header>

    <main class="flex flex-1 overflow-auto">
      <aside>
        <MobileSidebar v-model="sidebarOpen" :navigation="navigation" />
        <DesktopSidebar :navigation="navigation" />
      </aside>

      <div class="flex-1 overflow-auto lg:pl-72 pt-6 lg:pt-1">
        <div v-if="authStore.customer" class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </div>
    </main>
    <footer class="sticky bottom-0 z-50 bg-dark-blue-color lg:bg-transparent">
      <Footer />
    </footer>
  </div>
</template>


<script setup lang="ts">
import {onMounted, ref} from 'vue'

import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
} from '@heroicons/vue/24/outline'

import HomeIcon from '@/components/ui/icons/HomeIcon.vue'
import ChartIcon from '@/components/ui/icons/ChartIcon.vue'
import UsersIcon from '@/components/ui/icons/UsersIcon.vue'

import MobileSidebar from "@/components/sidebar/MobileSidebar.vue";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar.vue";
import Header from "@/components/sidebar/Header.vue";
import Footer from "@/components/sidebar/Footer.vue";
import {initFlowbite} from "flowbite";
import {useAuthStore} from "@/stores/auth";

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Login', href: '/login', icon: ChartIcon },
    { name: 'Checkout', href: '/checkout', icon: UsersIcon},
    { name: 'Projects', href: '/projects', icon: FolderIcon },
    { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
    { name: 'Documents', href: '/documents', icon: DocumentDuplicateIcon },
    { name: 'Reports', href: '/reports', icon: ChartPieIcon },
]

const sidebarOpen = ref(false)

onMounted(() => {
  initFlowbite();
})

const authStore = useAuthStore()

</script>
