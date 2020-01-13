
import { baseBlockstackApi } from "./constants";
import { client } from "./helpers";

const loadAccount = (account, apiBase = baseBlockstackApi) => {
  try {
    return client.get(`${apiBase}/users/${account.toLowerCase().trim()}`);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const Load = { account: loadAccount };

export {
  Load as default, loadAccount
};
