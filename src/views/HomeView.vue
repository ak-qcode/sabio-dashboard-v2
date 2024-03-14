<script setup lang="ts">
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import {type TradingAccount, useTradingAccountStore} from "@/stores/tradingAccount";
import {onMounted, ref, watch} from "vue";
import {Switch, SwitchGroup, SwitchLabel} from '@headlessui/vue'
import ApexCharts from "apexcharts";
import GeneralInfo from "@/components/dashboard/GeneralInfo.vue";

const tradingAccountStore = useTradingAccountStore();

const useTestData = ref(true)

const options = {
  chart: {
    height: "200%",
    maxWidth: "100%",
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: "#1C64F2",
      gradientToColors: ["#1C64F2"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 6,
  },
  grid: {
    show: true,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: 0
    },
  },
  series: [
    {
      name: "Equity",
      data: [] as number[],
      color: "#1A56DB",
    },
  ],
  yaxis: {
    show: true,
    title: {
      text: "Balance",
    },
    labels: {
      show: true,
    }
  },
  xaxis: {
    categories: [] as string[],
    labels: {
      show: true,
    },
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: false,
    },
  },
}

const renderChart = () => {
  if (useTestData.value) {
    options.series[0].data = [6500, 6418, 6456, 6526, 6356, 6456, 7880, 1233, 3000, 4000, 5000, 3500, 7200, 1234, 3214, 5634, 6542, 8000];
    options.xaxis.categories = [
      "01.01",
      "02.01",
      "03.01",
      "04.01",
      "05.01",
      "06.01",
      "07.01",
      "08.01",
      "09.01",
      "10.01",
      "11.01",
      "12.01",
      "13.01",
      "14.01",
      "15.01",
      "16.01",
      "17.01",
      "18.01",
    ];
  } else {
    console.log("clear!")
    options.series[0].data = [];
    options.xaxis.categories = [];

    if (tradingAccountStore.dashboardData) {
      options.series[0].data = tradingAccountStore.dashboardData.equity.values;
      options.xaxis.categories = tradingAccountStore.dashboardData.equity.dates;
    }
  }

  const areaChartEl = document.getElementById("area-chart");
  if (areaChartEl && typeof ApexCharts !== 'undefined') {
    areaChartEl.innerHTML = ""
    const chart = new ApexCharts(areaChartEl, options);
    chart.render();
  }
}

watch(useTestData, renderChart)

const newName = ref('') // FIXME: remove it

const callback = () => {
  if (tradingAccountStore.currentAccount) {
    tradingAccountStore.fetchShow(tradingAccountStore.currentAccount.id)

    newName.value = tradingAccountStore.currentAccount.display_name || ""
  }
}

onMounted(callback)

watch(() => tradingAccountStore.currentAccount, callback)

watch(() => tradingAccountStore.dashboardData, renderChart)


const handleSetName = (e: Event) => { // FIXME: remove it
  e.preventDefault()

  if (!tradingAccountStore.currentAccount || !newName.value) {
    return;
  }

  tradingAccountStore.setName(tradingAccountStore.currentAccount.id, newName.value)
}

</script>
<template>
    <DashboardLayout>
      <SwitchGroup as="div" class="flex items-center mb-4">
        <Switch v-model="useTestData"
                :class="[useTestData ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
          <span aria-hidden="true"
                :class="[useTestData ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"/>
        </Switch>
        <SwitchLabel as="span" class="ml-3 text-sm">
          <span class="font-medium text-gray-900">Use test data for chart</span>
        </SwitchLabel>
      </SwitchGroup>

      <div v-if="tradingAccountStore.currentAccount">
        <GeneralInfo :data="tradingAccountStore.dashboardData"/>

        <hr class="my-6">

        <div class="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
          <div class="flex justify-end gap-12 items-center">
            <div>
              <h5 class="leading-none text-gray-500 dark:text-gray-400 pb-2">Max Permitted Loss</h5>
              <p class="text-gray-900 dark:text-white">{{ useTestData ? "$800.00" : "?" }}</p>
            </div>
            <div>
              <h5 class="text-gray-500 dark:text-gray-400 pb-2">Today's Permitted Loss</h5>
              <p class="text-gray-900 dark:text-white">{{ useTestData ? "$500.00" : "?" }}</p>
            </div>
            <div>
              <h5 class="text-gray-500 dark:text-gray-400 pb-2">Today's Profit</h5>
              <p class="text-gray-900 dark:text-white">{{ useTestData ? "$12.00" : "?" }}</p>
            </div>
          </div>
          <div id="area-chart"></div>
        </div>

        <hr class="my-6">

        <div class="w-full sm:w-fit">
          <h3 class="font-semibold text-lg">Update name of the selected trading account</h3>
          <form @submit="handleSetName" class="mt-3">
            <div>
              <label for="displayName" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div class="mt-2">
                <input type="text" v-model="newName" placeholder="Rocket to the moon" id="displayName" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <p class="mt-2 text-sm text-gray-500" id="email-description">You can use letters, numbers, and spaces only. No special symbols or punctuation.</p>
            </div>
            <button type="submit" class="rounded-md bg-indigo-600 mt-3 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
          </form>
        </div>
      </div>
      <div v-else>
        trading account is not selected
      </div>

    </DashboardLayout>
</template>

