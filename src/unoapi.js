import axios from 'axios'

const unoapi = axios.create({
  baseURL: 'https://unobrokers.com/wp-json/wp/v2'
})

export default unoapi
