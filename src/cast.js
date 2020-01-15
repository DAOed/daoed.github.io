/**
* Cast module is for casting raw accounts data objects into the scheme {@link schemaOne}
* @module Cast
*/

import { filterQuality } from "./quality";
import { schemaAll } from "./schema";

/**
* Casts accounts
* @function castAccounts
* @param {array} accs - Raw array of account data objects from a search
* @param {object} settings - settings object
* @returns {array} returns array of `schemed` account data sorted by `domain/quality` based on the `settings`
*/
const castAccounts = (accs, settings) => {
  if (settings && (Object.prototype.toString.call(settings) !== "[object Object]")) settings = {};

  const domainData = !settings
    ? accs : (settings.anyDomain && !settings.filterQualityedDomains.length)
      ? accs : (!settings.anyDomain && settings.filterQualityedDomains.length)
        ? filterQuality(accs, "domain", settings.filterQualityedDomains) : accs;

  const qualityData = !settings
    ? accs : (settings.anyQuality && !settings.qualityChecks.length)
      ? domainData : (!settings.anyQuality && settings.qualityChecks.length)
        ? filterQuality(domainData, "quality", settings.qualityChecks) : domainData;

  return schemaAll(qualityData);
};

const Cast = { accounts: castAccounts };

export {
  Cast as default, castAccounts
};
