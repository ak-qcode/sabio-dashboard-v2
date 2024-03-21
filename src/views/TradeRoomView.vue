<script setup lang="ts">
import {useTradingAccountStore} from "@/stores/tradingAccount";
import {onMounted, type Ref, ref, watch} from "vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import LoaderCircle from "@/components/ui/icons/LoaderCircle.vue";
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
      <div v-else class="flex flex-col gap-4 absolute -translate-y-2/4	-translate-x-2/4 top-[50%] left-[50%] items-center justify-center">
        <p class="font-bold text-xl text-white">Please stand by</p>
        <LoaderCircle />
      </div>
    </DashboardLayout>
</template>

