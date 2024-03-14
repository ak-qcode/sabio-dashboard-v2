<script setup lang="ts">
import {useTradingAccountStore} from "@/stores/tradingAccount";
import {onMounted, type Ref, ref, watch} from "vue";
import FullScreenLayout from "@/layouts/FullScreenLayout.vue";

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
    <FullScreenLayout>
      <iframe v-if="url" :src="url" class="w-full aspect-video" />
      <p v-else>Loading TradeRoom ...</p>
    </FullScreenLayout>
</template>

