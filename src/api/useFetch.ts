import {createFetch} from "@vueuse/core";
import axios from "axios";

const useFetch = createFetch({
  baseUrl: axios.defaults.baseURL,
  fetchOptions: {
    mode: 'cors',
  },
})

export default useFetch
