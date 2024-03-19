<script lang="ts" setup>

import DashboardLayout from "@/layouts/DashboardLayout.vue";
import Plans from "@/components/checkout/Plans.vue";
import BillingDetails from "@/components/checkout/BillingDetails.vue";
import CheckoutSummary from "@/components/checkout/CheckoutSummary.vue";
import PaymentMethods from "@/components/checkout/PaymentMethods.vue";

</script>

<template>
  <DashboardLayout>
    <div class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 pt-16 pb-40">
      <div class="md:max-w-[679px]">
        <Plans class="border-b border-gray-900/10 pb-8"/>
        <BillingDetails class="mt-8"/>
        <PaymentMethods />
      </div>
      <div class="md:max-w-[679px]">
        <CheckoutSummary class="mt-10"/>
      </div>
    </div>
  </DashboardLayout>
</template>
