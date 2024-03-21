<script setup lang="ts">
import {useTradingAccountStore} from "@/stores/tradingAccount";
import {onMounted, type Ref, ref, watch} from "vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import {useRoute, useRouter} from "vue-router";
import {notify} from "notiwind";

const route = useRoute()
const router = useRouter()

const tradingAccountStore = useTradingAccountStore();

let url: Ref<string | null> = ref(null)

const callback = async () => {
  const id = +route.params.tradingAccountId
  if (!id) {
    if (tradingAccountStore.currentAccount) {
      await router.push('/traderoom/' + tradingAccountStore.currentAccount.id)
      return
    }

    notify({
      title: "Trading Account is not selected",
      type: "error",
    }, 10000)

    await router.push('/')
    return
  }

  url.value = await tradingAccountStore.getLink(id)
}

watch(() => route.params.tradingAccountId, callback)

onMounted(callback)
</script>
<template>
    <DashboardLayout>
      <iframe v-if="url" :src="url" class="w-full aspect-video" allowfullscreen />
      <p v-else>Loading TradeRoom ...</p>
    </DashboardLayout>
</template>

