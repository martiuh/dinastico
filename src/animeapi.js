import axios from 'axios'

const wikiapi = axios.create({
  baseURL: 'https://api.jikan.moe/v3'
})

export default wikiapi
