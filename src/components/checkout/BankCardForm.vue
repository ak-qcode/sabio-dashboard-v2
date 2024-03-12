<script setup lang="ts">

</script>

<template>
  <fieldset>
    <legend class="block text-sm font-medium leading-6 text-gray-900">Card Details</legend>
    <div class="mt-2 -space-y-px rounded-md bg-white shadow-sm">
      <div>
        <label for="card-number" class="sr-only">Card number</label>
        <input type="text" name="card-number" id="card-number" class="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Card number" />
      </div>
      <div class="flex -space-x-px">
        <div class="w-1/2 min-w-0 flex-1">
          <label for="card-expiration-date" class="sr-only">Expiration date</label>
          <input type="text" name="card-expiration-date" id="card-expiration-date" class="relative block w-full rounded-none rounded-bl-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="MM / YY" />
        </div>
        <div class="min-w-0 flex-1">
          <label for="card-cvc" class="sr-only">CVC</label>
          <input type="password" name="card-cvc" id="card-cvc" class="relative block w-full rounded-none rounded-br-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="CVC" />
        </div>
      </div>
    </div>
  </fieldset>
</template>

