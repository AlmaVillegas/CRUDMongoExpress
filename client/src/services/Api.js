import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://172.16.214.82:8081`
  })
}
