
import { baseBlockstackApi } from "./constants"
import { client } from "./helpers"

const apiHealth = (apiBase = baseBlockstackApi) => {
  try {
    return client.get(`${apiBase}/node/ping`)
  } catch (err) {
    console.log(err)
    return []
  }
}

const Health = { api: apiHealth }

export {
  Health as default, apiHealth
}
