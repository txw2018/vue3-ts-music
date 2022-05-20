import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, { retries: 5 })

const ERR_OK = 0

const baseURL = import.meta.env.PROD ? 'http://ustbhuangyi.com/music-next/' : 'http://192.168.2.9:3000/'

axios.defaults.baseURL = baseURL
interface ResultData<T> {
  code: number
  result: T
}
export function get<T, P = any >(url: string, params?: P) {
  return axios.get<ResultData<T>>(url, {
    params,
  }).then((res) => {
    const serverData = res.data
    if (serverData.code === ERR_OK)
      return serverData.result
  }).catch((e) => {
    console.error(e)
  })
}
