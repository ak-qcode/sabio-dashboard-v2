<script setup lang="ts">
import {useTradingAccountStore} from "@/stores/tradingAccount";
import {onMounted, type Ref, ref, watch} from "vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import LoaderCircle from "@/components/ui/icons/LoaderCircle.vue";

const tradingAccountStore = useTradingAccountStore();

let url: Ref<string | null> = ref(null)

const callback = async () => {
  if (tradingAccountStore.currentAccount) {
    url.value = await tradingAccountStore.getLink(tradingAccountStore.currentAccount.id)
  }
}

onMounted(callback)

watch(() => tradingAccountStore.currentAccount, callback)

</script>
<template>
    <DashboardLayout>
      <iframe v-if="url" :src="url" class="w-full aspect-video" />
      <div v-else class="flex flex-col gap-4 absolute -translate-y-2/4	-translate-x-2/4 top-[50%] left-[50%] items-center justify-center">
        <p class="font-bold text-xl text-white">Please stand by</p>
        <LoaderCircle />
      </div>
    </DashboardLayout>
</template>

