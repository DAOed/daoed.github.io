/**
* Load module is for loading data from the Stack Blockchain
* @module Load
*/

import { baseBlockstackApi } from "./constants";
import { client } from "./helpers";

/**
* @async
* @function loadAccount
* @param {string} account - username of account whose data to load
* @param {string} apiBase - BlockStack API endpoint, see {@link baseBlockstackApi} for default
* @returns {Promise<object>} returns account data object
*/
const loadAccount = (account, apiBase = baseBlockstackApi) =>
  client.get(`${apiBase}/users/${account.toLowerCase().trim()}`);

const Load = { account: loadAccount };

export {
  Load as default, loadAccount
};
