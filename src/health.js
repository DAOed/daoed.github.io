/**
* Health module is for checking on health status on BlockStack API endpoint, For default {@link baseBlockstackApi}
* @module Health
*/

import { baseBlockstackApi } from "./constants";
import { client } from "./helpers";

/**
* @async
* @function apiHealth
* @param {string} apiBase - BlockStack API endpoint to test
* @returns {Promise<object>} returns result of request
*/
const apiHealth = (apiBase = baseBlockstackApi) => client.get(`${apiBase}/node/ping`);

const Health = { api: apiHealth };

export {
  Health as default, apiHealth
};
