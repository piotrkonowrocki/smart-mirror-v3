import axios, {AxiosResponse} from 'axios'
import {camelCase} from 'change-case/keys'

axios.interceptors.response.use(
  (response) => camelCase(response, 256) as AxiosResponse<unknown, unknown>,
  (error) => Promise.reject(error),
)

export default axios
