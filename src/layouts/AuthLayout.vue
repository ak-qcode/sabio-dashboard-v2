<script setup>
import SabioLogo from '@/components/ui/icons/SabioLogo.vue';
import LanguageSelector from "@/components/ui/LanguageSelector.vue";

</script>

<template>
    <div class="flex h-full flex-1 flex-col justify-center sm:px-6 lg:px-8 mt-4">
        <div class="sm:mx-auto sm:w-full px-4 sm:max-w-screen-lg">
            <header class="flex justify-between items-center">
                <SabioLogo />   
                <LanguageSelector />

            </header>
                    
            <h2 class="mt-20 sm:mt-40 text-center text-4xl font-bold leading-9 tracking-tight text-white">
                <slot name="title"/>
            </h2>
        </div>

        <slot />
    </div>
</template>

