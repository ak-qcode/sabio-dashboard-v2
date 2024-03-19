<script setup lang="ts">
import {computed} from "vue";
import bgImage from '@/assets/banner.png';
import Button from '@/components/ui/Button/Button.vue';
import { useRouter } from 'vue-router';

const props = defineProps(['data'])

const isLoading = computed(() => !props.data);
const router = useRouter();
const navigateToCheckout = () => {
  router.push({ name: 'checkout' });
};

</script>

<template>
<div class="rounded-xl lg:w-1/2 xl:w-3/5 px-4 py-6 sm:px-6 bg-no-repeat bg-cover" :style="{ backgroundImage: `url(${bgImage})` }">
   <h4 class="text-white text-3xl">New January<br> Challenge</h4>
   <p class="text-white pt-1.5">New Challenge is waiting you!</p>
   <Button class="mt-5" type="button" @click="navigateToCheckout">Proceed to Checkout</Button>
  </div>
</template>
