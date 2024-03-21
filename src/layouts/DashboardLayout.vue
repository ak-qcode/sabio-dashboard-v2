
<template>
  <div class="flex flex-col min-h-screen">
    <header class="sticky top-0 z-50">
      <Header v-model="sidebarOpen" />
    </header>

    <main class="flex flex-1 overflow-auto">
      <aside>
        <MobileSidebar v-model="sidebarOpen" :navigation="navigation" />
        <DesktopSidebar :navigation="navigation" :isSidebarCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
      </aside>

      <div :class="[isSidebarCollapsed ? 'pl-12' : 'pl-72', 'flex-1 overflow-auto transition-all duration-300']">
        <div v-if="authStore.customer" class="px-4 sm:px-6 lg:px-8 container mx-auto">
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
import AccountsAccentIcon from '@/components/ui/icons/accent/AccountsIcon.vue'
import TradingDashboardAccentIcon from '@/components/ui/icons/accent/TradingDashboardIcon.vue'
import ChartAccentIcon from '@/components/ui/icons/accent/ChartIcon.vue'
import CheckoutAccentIcon from '@/components/ui/icons/accent/CheckoutIcon.vue'
import TradeRoomAccentIcon from '@/components/ui/icons/accent/TradeRoomIcon.vue'

import MobileSidebar from "@/components/sidebar/MobileSidebar.vue";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar.vue";
import Header from "@/components/sidebar/Header.vue";
import Footer from "@/components/sidebar/Footer.vue";
import {initFlowbite} from "flowbite";
import {useAuthStore} from "@/stores/auth";
import { isSidebarCollapsed } from '@/stores/sidebarState';

const navigation = [
    // { name: 'SabioVerse', href: '/sabioverse', icon: HomeIcon },
    { name: 'TradeRoom', href: '/traderoom', icon: ChartIcon, activeIcon: TradeRoomAccentIcon },
    { name: 'Trading Dashboard', href: '/', icon: TradingDashboardIcon, activeIcon: TradingDashboardAccentIcon  },
    { name: 'Login', href: '/login', icon: UsersIcon, activeIcon: ChartIcon  },
    { name: 'Profile', href: '/profile', icon: UsersIcon, activeIcon: ChartIcon  },
    { name: 'My accounts', href: '/accounts', icon: AccountsIcon, activeIcon: AccountsAccentIcon  },
    { name: 'Checkout', href: '/checkout', icon: CheckoutIcon, activeIcon: CheckoutAccentIcon  },
    // { name: 'Payouts', href: '/payouts', icon: PayoutsIcon },
    // { name: 'Competition', href: '/competition', icon: EducationIcon },
    // { name: 'Education', href: '/education', icon: EducationIcon },
    // { name: 'Trading Psychology', href: '/tradingpsychology', icon: StarsIcon },
    // { name: 'Certificates', href: '/certificates', icon: CertificatesIcon },
    // { name: 'Community', href: '/community', icon: CommunityIcon },
]

const sidebarOpen = ref(false)
const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};


onMounted(() => {
  initFlowbite();
})

const authStore = useAuthStore()

</script>
