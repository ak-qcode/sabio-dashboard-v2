import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useAuthStore } from './stores/auth';

import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL

const app = createApp(App)

app.use(createPinia())
app.use(router)

const auth = useAuthStore()

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    if (!auth.isLoading && !auth.isLoggedIn) {
      return '/login'
    }

    // TODO: wait until loading is finished
  }
})

axios.interceptors.response.use(undefined, function (error) {
  const statusCode = error.response ? error.response.status : null;

  if (statusCode === 401 && router.currentRoute?.value?.name != 'login') {
    alert('received 401 code, logging out...') // TODO: replace by notifier

    auth.$reset()

    router.push('/login') // FIXME: doesn't work

    return null
  }

  return Promise.reject(error);
})

app.mount('#app')

auth.fetchCustomerInfo()
