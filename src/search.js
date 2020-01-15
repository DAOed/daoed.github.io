/**
* Search module is for searching data on the Stack Blockchain
* @module Search
*/

import { baseBlockstackApi } from "./constants";
import { client } from "./helpers";

/**
* @async
* @function searchAccounts
* @param {string} account - name of account to search - not username
* @param {string} apiBase - BlockStack API endpoint, see {@link baseBlockstackApi} for default
* @returns {Promise<array>} returns array of account data objects of accounts with similar/matching names
*/
const searchAccounts = (account, apiBase = baseBlockstackApi) =>
  client.get(`${apiBase}/search?query=${account.toLowerCase().trim()}`);

const Search = { accounts: searchAccounts };

export {
  Search as default, searchAccounts
};
