<script setup lang="ts">
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import {type TradingAccount, useTradingAccountStore} from "@/stores/tradingAccount";
import {onMounted, ref, watch} from "vue";
import {Switch, SwitchGroup, SwitchLabel} from '@headlessui/vue'
import ApexCharts from "apexcharts";
import GeneralInfo from "@/components/dashboard/GeneralInfo.vue";
import Statistic from "@/components/dashboard/Statistic.vue";
import Banner from "@/components/dashboard/Banner.vue";
import ProfitTarget from "@/components/dashboard/ProfitTarget.vue";
import bgImage from '@/assets/gradient-chart.png';


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
    stroke: {
      curve: 'straight',
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
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100],
      colorStops: [
        {
          offset: 0,
          color: "#4DF2FF",
          opacity: 1
        },
        {
          offset: 100,
          color: "#1301FF",
          opacity: 1
        }
      ]
    }
  },
  dataLabels: {
    enabled: false,
    style: {
      colors: ['#ffffff']
    },
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
      style: {
        color: '#B9BADB',
      },
    },
    labels: {
      show: true,
      style: {
        colors: ['#ffffff']
      }
    }
  },
  xaxis: {
    show: true,
    categories: [] as string[],
    title: {
      text: 'Trade Date',
      style: {
        color: '#B9BADB',
      },
    },
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: true,
      style: {
        colors: '#ffffff'
      }
    }
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

onMounted(() => {
  if (tradingAccountStore.currentAccount) {
    tradingAccountStore.fetchShow(tradingAccountStore.currentAccount.accountId)
  }
})

watch(() => tradingAccountStore.currentAccount, (currentAccount: TradingAccount | null | undefined) => {
  if (currentAccount) {
    tradingAccountStore.fetchShow(currentAccount.accountId)
  }
})

watch(() => tradingAccountStore.dashboardData, renderChart)

</script>
<template>
    <DashboardLayout>
      <SwitchGroup as="div" class="flex items-center mb-4">
        <Switch v-model="useTestData"
                :class="[useTestData ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent  transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
          <span aria-hidden="true"
                :class="[useTestData ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out bg-accent-green-color']"/>
        </Switch>
        <SwitchLabel as="span" class="ml-3 text-sm">
          <span class="font-medium text-white">Use test data for chart</span>
        </SwitchLabel>
      </SwitchGroup>

      <div v-if="tradingAccountStore.currentAccount" class="pb-8">
        <section class="flex gap-4 xl:gap-6 flex-col lg:flex-row my-6">
          <GeneralInfo :data="tradingAccountStore.dashboardData"/>
          <Banner />
        </section>
        <section class="flex gap-4 xl:gap-6 flex-col lg:flex-row my-6">
          <ProfitTarget :data="tradingAccountStore.dashboardData"/>
          <Statistic :data="tradingAccountStore.dashboardData"/>
        </section>

        <div class="w-full rounded-lg shadow dark:bg-gray-800 p-4 md:p-8 border border-white border-opacity-5 bg-no-repeat bg-cover" :style="{ backgroundImage: `url(${bgImage})` }">
          <div class="flex justify-end gap-12 items-center md:px-4">
            <div>
              <h5 class="leading-none text-dop-color text-xs dark:text-gray-400 pb-2">Max Permitted Loss</h5>
              <p class="text-white text-lg dark:text-white">{{ useTestData ? "$800.00" : "?" }}</p>
            </div>
            <div>
              <h5 class="text-dop-color text-xs dark:text-gray-400 pb-2">Today's Permitted Loss</h5>
              <p class="text-white text-lg dark:text-white">{{ useTestData ? "$500.00" : "?" }}</p>
            </div>
            <div>
              <h5 class="text-dop-color text-xs dark:text-gray-400 pb-2">Today's Profit</h5>
              <p class="text-white text-lg dark:text-white">{{ useTestData ? "$12.00" : "?" }}</p>
            </div>
          </div>
          <div id="area-chart" class="pt-4"></div>
        </div>
      </div>
      <div v-else>
        trading account is not selected
      </div>

    </DashboardLayout>
</template>

