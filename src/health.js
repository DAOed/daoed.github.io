
import { baseBlockstackApi } from "./constants";
import { client } from "./helpers";

const apiHealth = (apiBase = baseBlockstackApi) => client.get(`${apiBase}/node/ping`);

const Health = { api: apiHealth };

export {
  Health as default, apiHealth
};
