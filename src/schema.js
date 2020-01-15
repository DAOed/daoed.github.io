/**
* Schema module casts an account data object into a more organized form
* @module Schema
*/

import { algorithmWeigth, socialWeigth, constantWeigths } from "./constants";
import { initialsAvatar } from "./helpers";

/**
* @async
* @function schemaOne
* @param {object} accountData - account data object to cast/scheme
* @returns {object} returns account data object schemed/casted in the manner : {profile, social, details, apps, api}
*/
const schemaOne = (accountData) => {
  if (!accountData.fullyQualifiedName) accountData.fullyQualifiedName = accountData.username;

  const profile = accountData.profile;
  const account = profile.account || [];

  profile.address = profile.address || {};
  profile.image = profile.image || [];

  const avatar = profile.image.find((img) => img.name === "avatar") || {};
  const cover = profile.image.find((img) => img.name === "cover") || {};

  const facebook = account.find((acc) => acc.service === "facebook") || {};
  const twitter = account.find((acc) => acc.service === "twitter") || {};
  const linkedin = account.find((acc) => acc.service === "linkedin") || {};
  const github = account.find((acc) => acc.service === "github") || {};
  const steem = account.find((acc) => acc.service === "steem") || {};

  const bitcoin = account.find((acc) => acc.service === "bitcoin") || {};
  const ethereum = account.find((acc) => acc.service === "ethereum") || {};

  const website = (accountData.website || []).find((site) => site["@WebSite"] === "Website") || {};

  return {
    profile: {
      name: (profile.name || "").substr(0, 30),
      description: (profile.description || "").substr(0, 100),
      avatar: avatar.contentUrl,
      cover: cover.contentUrl,
      location: profile.address.addressLocality,
      initialsAvatar: avatar.contentUrl ? {} : initialsAvatar(profile.name || accountData.fullyQualifiedName),
      website: website.url
    },
    social: {
      facebook: facebook.identifier ? `https://fb.com/${facebook.identifier}` : null,
      twitter: twitter.identifier ? `https://twitter.com/${twitter.identifier}` : null,
      linkedin: linkedin.identifier ? `https://linkedin.com/in/${linkedin.identifier}` : null,
      steem: steem.identifier ? `https://steem.online/@${steem.identifier}` : null,
      github: github.identifier ? `https://github.com/${github.identifier}` : null
    },
    detail: {
      type: profile["@type"],
      identifier: accountData.fullyQualifiedName.split(".")[0],
      domain: accountData.fullyQualifiedName.substring(accountData.fullyQualifiedName.indexOf(".") + 1),
      username: accountData.username,
      id: accountData.fullyQualifiedName,
      gaia: accountData.profile && accountData.profile.api ? new URL(accountData.profile.api.gaiaHubUrl).hostname : "",
      bitcoin: bitcoin.identifier,
      ethereum: ethereum.identifier
    },
    apps: profile.apps,
    api: profile.api
  };
};

/**
* @function schemaAll
* @param {array} accountsData - account data objects to cast/scheme
* @returns {array} returns array of account data objects schemed/casted in the manner @see {@link schemaOne}
*/
const schemaAll = (accountsData) => {
  return accountsData.map(schemaOne);
};

const Schema = { one: schemaOne, all: schemaAll };

export {
  Schema as default, schemaOne, schemaAll
};
