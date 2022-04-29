import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, { retries: 5 })

const ERR_OK = 0
const baseURL = process.env.NODE_ENV === 'production' ? 'http://ustbhuangyi.com/music-next/' : 'http://localhost:3000/'

axios.defaults.baseURL = baseURL

export function get<T = any>(url: string, params?: T) {
  return axios.get(url, {
    params,
  }).then((res) => {
    const serverData = res.data
    if (serverData.code === ERR_OK)
      return serverData.result
  }).catch((e) => {
    console.error(e)
  })
}
