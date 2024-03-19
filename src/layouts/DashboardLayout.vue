
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
import TradingDashboardIcon from '@/components/ui/icons/TradingDashboardIcon.vue'
import AccountsIcon from '@/components/ui/icons/AccountsIcon.vue'
import CheckoutIcon from '@/components/ui/icons/CheckoutIcon.vue'
import PayoutsIcon from '@/components/ui/icons/PayoutsIcon.vue'
import EducationIcon from '@/components/ui/icons/EducationIcon.vue'
import StarsIcon from '@/components/ui/icons/StarsIcon.vue'
import CertificatesIcon from '@/components/ui/icons/CertificatesIcon.vue'
import CommunityIcon from '@/components/ui/icons/CommunityIcon.vue'

import MobileSidebar from "@/components/sidebar/MobileSidebar.vue";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar.vue";
import Header from "@/components/sidebar/Header.vue";
import Footer from "@/components/sidebar/Footer.vue";
import {initFlowbite} from "flowbite";
import {useAuthStore} from "@/stores/auth";

const navigation = [
    { name: 'SabioVerse', href: '/sabioverse', icon: HomeIcon },
    { name: 'TradeRoom', href: '/traderoom', icon: ChartIcon },
    { name: 'Trading Dashboard', href: '/', icon: TradingDashboardIcon },
    { name: 'Login', href: '/login', icon: UsersIcon },
    { name: 'Profile', href: '/profile', icon: UsersIcon },
    { name: 'My accounts', href: '/accounts', icon: AccountsIcon },
    { name: 'Checkout', href: '/checkout', icon: CheckoutIcon },
    { name: 'Payouts', href: '/payouts', icon: PayoutsIcon },
    { name: 'Competition', href: '/competition', icon: EducationIcon },
    { name: 'Education', href: '/education', icon: EducationIcon },
    { name: 'Trading Psychology', href: '/tradingpsychology', icon: StarsIcon },
    { name: 'Certificates', href: '/certificates', icon: CertificatesIcon },
    { name: 'Community', href: '/community', icon: CommunityIcon },
]

const sidebarOpen = ref(false)

onMounted(() => {
  initFlowbite();
})

const authStore = useAuthStore()

</script>
