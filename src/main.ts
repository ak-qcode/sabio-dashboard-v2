import './assets/main.css'

import {createApp, markRaw} from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useAuthStore } from './stores/auth';

import axios from "axios";
import Notifications, { notify } from 'notiwind'
import {Tolgee, DevTools, LanguageDetector, LanguageStorage, VueTolgee, FormatSimple, useTolgee} from '@tolgee/vue';
import {setNumberFormatter} from "@/utils/numberFormatter";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.$router = markRaw(router)
})

app.use(pinia)
app.use(router)
app.use(Notifications)

const tolgee = Tolgee()
    .use(DevTools())
    .use(LanguageDetector())
    .use(LanguageStorage())
    .use(FormatSimple())
    .init({
      availableLanguages: ['en', 'cs', 'es', 'fr'],
      defaultLanguage: 'en',

      // for development
      apiUrl: import.meta.env.VITE_APP_TOLGEE_API_URL,
      apiKey: import.meta.env.VITE_APP_TOLGEE_API_KEY,

      // for production
      staticData: {},
    });

app.use(VueTolgee, { tolgee });

setNumberFormatter(tolgee.getInitialOptions().defaultLanguage || "en")

tolgee.on('language', setNumberFormatter);

const auth = useAuthStore()

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    if (!auth.isLoading && !auth.isLoggedIn) {
      return '/login'
    }

    // TODO: wait until loading is finished
  }
})

axios.interceptors.request.use(async (config) => {
  const safeMethods = ['GET', 'OPTIONS', 'HEAD']
  if (config.method && !safeMethods.includes(config.method.toUpperCase())) {
    await axios.get('/sanctum/csrf-cookie')
  }

  return config
})

axios.interceptors.response.use(undefined, function (error) {
  const statusCode = error.response ? error.response.status : null;

  if (!statusCode) {
    notify({
      title: "Server request execution error",
      text: error.message,
      type: "error",
    }, 15000)

    return null
  }

  if (statusCode === 401 && router.currentRoute?.value?.name != 'login') {
    notify({
      title: "You're no longer authenticated",
      text: "Your authentication session has expired. Please log in again.",
      type: "warning",
    }, 5000)

    auth.reset()

    router.push('/login')

    return null
  }

  return Promise.reject(error);
})

app.mount('#app')
