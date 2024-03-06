<script setup lang="ts">
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import {notify} from "notiwind";
import {useAuthStore} from "@/stores/auth";

const auth = useAuthStore();

const handler = () => {
  notify({
    title: 'Welcome back, ' + (auth.customer?.firstName || 'SabioTrader') + '!',
  }, 2500)
}
</script>
<template>
    <DashboardLayout>
        Hello, world!
      <br />
      <button @click="handler" type="button" class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Test notification (type info)
      </button>
    </DashboardLayout>
</template>

