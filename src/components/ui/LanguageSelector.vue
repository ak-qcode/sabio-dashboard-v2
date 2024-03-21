<template>
  <div class="relative min-w-28">
    <button @click="toggleDropdown" class="text-dop-color group w-full flex gap-x-2 items-center rounded-md p-2 text-sm font-semibold hover:bg-blue-color">
      <img :src="selectedLanguage.icon" class="mr-1 h-6 w-6 rounded-full" alt="Flag" />
      <span>{{ selectedLanguage.name }}</span>
      <div class="border rounded-md border-white-opacity-color group-hover:border-dop-color p-1">
        <ChevronDown :class="{'svg-rotate': isOpen}" class="transition-transform duration-200"/>
      </div>
    </button>
    <ul v-if="isOpen" class="space-y-1 text-dop-color shadow-md border border-white-opacity-color rounded-md absolute w-full z-10 bg-black" role="list">
      <li v-for="language in languages" :key="language.locale">
        <button
          :class="[selectedLanguage.locale === language.locale ? 'bg-blue-color text-white' : 'text-indigo-200 hover:text-white w-full hover:bg-blue-color', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full']"
          @click="selectLanguage(language)"
        >
          <img :src="language.icon" class="h-6 w-6 rounded-full" :alt="`${language.name} flag`" />
          <span class="truncate">{{ language.name }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ChevronDown from '@/components/ui/icons/ChevronDown.vue';
import { useTradingAccountStore } from "@/stores/tradingAccount";

import FlagEn from '@/assets/flags/flagEn.svg';

const tradingAccountStore = useTradingAccountStore();
const isOpen = ref(false);
const toggleDropdown = () => isOpen.value = !isOpen.value;

const languages = ref([
  {
    locale: "en",
    name: "EN",
    icon: FlagEn
  },
  {
    locale: "es",
    name: "ES",   
    icon: FlagEn
  },
  {
    locale: "fr",
    name: "FR",
    icon: FlagEn
  },
  {
    locale: "pt",
    name: "PT",
    icon: FlagEn
  },
  {
    locale: "de",
    name: "DE",
    icon: FlagEn
  },
  {
    locale: "it",
    name: "IT",
    icon: FlagEn
  },
]);

const selectedLanguage = ref(languages.value[0]);

const selectLanguage = (language) => {
  selectedLanguage.value = language;
  isOpen.value = false;
};
</script>
