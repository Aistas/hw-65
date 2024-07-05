import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://hw-65-9300b-default-rtdb.asia-southeast1.firebasedatabase.app/',
})

export default axiosApi;