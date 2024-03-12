<template>
  <div>
    <label for="language" :class="['appearance-none block text-sm font-medium leading-6', isSidebar ? 'text-indigo-200' : 'text-gray-900']">Language</label>
    <select id="language" :value="tolgee.getLanguage()" v-on:change="changeLanguage" :class="[isSidebar ? 'ring-indigo-400 bg-indigo-500 text-indigo-200 focus:text-white focus:ring-indigo-200' : 'text-gray-900 ring-gray-300 focus:ring-indigo-600', 'mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset focus:ring-2 sm:text-sm sm:leading-6']">
      <option v-for="language in languages" :key="language.locale" :value="language.locale">{{ language.name }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useTolgee } from '@tolgee/vue';

defineProps([
  'isSidebar',
])

const tolgee = useTolgee(['language']);

const changeLanguage = (e: Event) => {
  tolgee.value.changeLanguage((e.target as HTMLInputElement).value);
};

const languages = [
  {
    locale: "en",
    name: "English",
  },
  {
    locale: "es",
    name: "Español",
  },
  {
    locale: "fr",
    name: "Français",
  },
  {
    locale: "pt",
    name: "Português",
  },
  {
    locale: "de",
    name: "Deutsch",
  },
  {
    locale: "it",
    name: "Italiano",
  },
];
</script>
