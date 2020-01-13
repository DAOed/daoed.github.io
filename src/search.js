
import { baseBlockstackApi } from "./constants";
import { client } from "./helpers";

const searchAccounts = (account, apiBase = baseBlockstackApi) => {
  try {
    return client.get(`${apiBase}/search?query=${account.toLowerCase().trim()}`);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const Search = { accounts: searchAccounts };

export {
  Search as default, searchAccounts
};
