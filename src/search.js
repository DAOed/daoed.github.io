
import { baseBlockstackApi } from "./constants";
import { client } from "./helpers";

const searchAccounts = (account, apiBase = baseBlockstackApi) =>
  client.get(`${apiBase}/search?query=${account.toLowerCase().trim()}`);

const Search = { accounts: searchAccounts };

export {
  Search as default, searchAccounts
};
