
import { baseBlockstackApi } from "./constants";
import { client } from "./helpers";

const loadAccount = (account, apiBase = baseBlockstackApi) =>
  client.get(`${apiBase}/users/${account.toLowerCase().trim()}`);

const Load = { account: loadAccount };

export {
  Load as default, loadAccount
};
